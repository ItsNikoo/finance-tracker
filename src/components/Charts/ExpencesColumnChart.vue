<script setup lang="ts">
import {computed} from "vue";
import {categories} from "@/categories.ts";
import {useTransactionsStore} from "@/stores/transactions.ts";
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

const chartLabels = computed(() => {
  return Array.from(expensesByCategory.value.keys()).map(catId => {
    const cat = categories.find(c => c.id === catId)
    return cat ? cat.name : catId
  })
})

const chartSeries = computed(() => [{
  name: 'Расходы',
  data: Array.from(expensesByCategory.value.values())
}])

const chartOptions = computed(() => ({
  colors: ['#2A7956'],
  chart: {
    height: 350,
    type: 'bar',
  },
  labels: chartLabels.value,
  xaxis: {
    categories: chartLabels.value,
    position: 'bottom',
    axisBorder: {show: false},
    axisTicks: {show: false},
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toLocaleString() + " ₽"
    }
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => Math.round(val).toLocaleString() + " ₽",
    offsetY: -20,
    style: {fontSize: '13px', colors: ['#304758']}
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      dataLabels: {position: 'top'}
    }
  },
  legend: {show: false},
  tooltip: {
    y: {
      formatter: (val: number) => val.toLocaleString() + " ₽"
    }
  }
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
        type="bar"
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
</style>