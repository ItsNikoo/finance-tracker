<script setup lang="ts">
import {useTransactionsStore} from "@/stores/transactions.ts";
import {categories} from "@/categories.ts";
import {computed} from "vue";
import type {Transaction} from "@/types.ts";

const store = useTransactionsStore()

const expensesByCategory = computed(() => {
  const expenseMap = new Map<string, number>();

  store.transactions.forEach((t: Transaction) => {
    if (!t.isIncome && t.categoryId && t.amount > 0) {
      const current = expenseMap.get(t.categoryId) || 0
      expenseMap.set(t.categoryId, current + t.amount)
    }
  })
  return expenseMap;
})

const chartSeries = computed(() => {
  return Array.from(expensesByCategory.value.values())
})

const chartLabels = computed(() => {
  return Array.from(expensesByCategory.value.keys()).map(catId => {
    const cat = categories.find(c => c.id === catId)
    return cat ? cat.name : catId  // fallback на id, если категория не найдена
  })
})

const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    height: 350,
    toolbar: { show: false },
  },
  labels: chartLabels.value,
  legend: {
    position: 'bottom',
    fontSize: '14px',
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => Math.round(val) + "%",
  },
  tooltip: {
    y: {
      formatter: (val: number) => val.toLocaleString('ru-RU') + " ₽",
    },
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Всего расходов',
            formatter: () => store.totalExpenses.toLocaleString('ru-RU') + " ₽",
          },
        },
      },
    },
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: { width: 320 },
      legend: { position: 'bottom' },
    },
  }],
}))

</script>

<template>
  <div class="expenses-chart">
    <h3 class="chart-title">Расходы по категориям</h3>

    <div v-if="store.totalExpenses === 0" class="no-data">
      Нет расходов за период
    </div>

    <apexchart
      v-else
      type="donut"
      height="380"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
</template>

<style scoped>
.expenses-chart {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.chart-title {
  text-align: center;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
}

.no-data {
  text-align: center;
  color: #6b7280;
  padding: 40px 0;
  font-size: 16px;
}
</style>
