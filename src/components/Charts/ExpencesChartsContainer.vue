<script setup lang="ts">
import {computed, ref} from "vue"
import ChartToggle from "@/components/UI/ChartToggle.vue"
import ExpencesPieChart from "@/components/Charts/ExpencesPieChart.vue"
import ExpencesColumnChart from "@/components/Charts/ExpencesColumnChart.vue"
import {useTransactionsStore} from "@/stores/transactions.ts"
import type {Transaction} from "@/types.ts"

const store = useTransactionsStore()
const isPie = ref(false)

const expensesByCategory = computed(() => {
  const expenseMap = new Map<number, number>()

  store.filteredTransactions.forEach((transaction: Transaction) => {
    if (!transaction.isIncome && transaction.amount > 0) {
      const current = expenseMap.get(transaction.categoryId) || 0
      expenseMap.set(transaction.categoryId, current + transaction.amount)
    }
  })

  return expenseMap
})

const chartData = computed(() => {
  const labels = Array.from(expensesByCategory.value.keys()).map(categoryId =>
    store.categoryNameById(categoryId)
  )

  const values = Array.from(expensesByCategory.value.values())

  return {labels, values}
})

const currentChart = computed(() =>
  isPie.value ? ExpencesPieChart : ExpencesColumnChart
)
</script>

<template>
  <div class="expenses-view">
    <div class="card-header">
      <div>
        <h3 class="card-title">Структура расходов</h3>
        <p class="card-subtitle">
          Нажмите на категорию, чтобы посмотреть операции подробнее
        </p>
      </div>

      <div class="chart-toggle">
        <ChartToggle v-model="isPie" size="lg"/>
      </div>
    </div>

    <div class="chart-type">
      {{ isPie ? "Круговая диаграмма" : "Столбчатая диаграмма" }}
    </div>

    <div class="chart-wrapper">
      <component
          :is="currentChart"
          :labels="chartData.labels"
          :values="chartData.values"
          :total-expenses="store.periodExpenses"
      />
    </div>
  </div>
</template>

<style scoped>
.expenses-view {
  width: 100%;
  max-width: 100%;
  padding-top: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.card-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 4px 0 0 0;
}

.chart-type {
  font-size: 14px;
  font-weight: 500;
  color: #2A7956;
  margin-bottom: 10px;
}

.chart-wrapper {
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
</style>
