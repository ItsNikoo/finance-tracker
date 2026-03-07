<script setup lang="ts">
import {computed} from "vue"
import {useTransactionsStore} from "@/stores/transactions"

const store = useTransactionsStore()

const months = computed(() =>
    store.groupedByMonth.slice().reverse()
)

const chartSeries = computed(() => [
  {
    name: "Доход",
    data: months.value.map(m => m.income)
  },
  {
    name: "Расход",
    data: months.value.map(m => m.expense)
  }
])

const chartOptions = computed(() => ({
  colors: ["#1E573D", "#C0392B"],

  chart: {
    type: "line",
    height: 350,
    toolbar: { show: false }
  },

  stroke: {
    width: 3
  },

  xaxis: {
    categories: months.value.map(m => m.title)
  },

  yaxis: {
    labels: {
      formatter: (val: number) =>
          val.toLocaleString("ru-RU") + " ₽"
    }
  },

  tooltip: {
    y: {
      formatter: (val: number) =>
          val.toLocaleString("ru-RU") + " ₽"
    }
  },

  legend: {
    position: "top"
  },

  dataLabels: {
    enabled: false
  }
}))
</script>

<template>
  <div class="income-chart">
    <h3 class="chart-title">Доходы и расходы по месяцам</h3>

    <div
        v-if="store.groupedByMonth.length === 0"
        class="no-data"
    >
      Нет данных
    </div>

    <apexchart
        v-else
        type="line"
        height="350"
        :options="chartOptions"
        :series="chartSeries"
    />
  </div>
</template>

<style scoped>
.income-chart {
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
}
</style>