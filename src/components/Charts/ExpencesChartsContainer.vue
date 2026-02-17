<script setup lang="ts">
import {ref, computed} from 'vue'
import ChartToggle from '@/components/UI/ChartToggle.vue'
import ExpencesPieChart from '@/components/Charts/ExpencesPieChart.vue'
import ExpencesColumnChart from '@/components/Charts/ExpencesColumnChart.vue'
import {useTransactionsStore} from "@/stores/transactions.ts";
import type {Transaction} from "@/types.ts";
import {categories} from "@/lib/categories.ts";

const store = useTransactionsStore()
const isPie = ref(false)

const expensesByCategory = computed(() => {
  const expenseMap = new Map<string, number>()

  store.filteredTransactions.forEach((t: Transaction) => {
    if (!t.isIncome && t.categoryId && t.amount > 0) {
      const current = expenseMap.get(t.categoryId) || 0
      expenseMap.set(t.categoryId, current + t.amount)
    }
  })
  return expenseMap
})

const chartData = computed(() => {
  const labels = Array.from(expensesByCategory.value.keys()).map(catId => {
    const cat = categories.find(c => c.id === catId)
    return cat ? cat.name : catId
  })

  const values = Array.from(expensesByCategory.value.values())

  return {labels, values}
})

const CurrentChart = computed(() =>
    isPie.value ? ExpencesPieChart : ExpencesColumnChart
)
</script>

<template>
  <div class="expenses-view">
    <div class="toggle-header">
      <ChartToggle v-model="isPie" size="lg"/>
      <span class="toggle-text">
        {{ isPie ? 'Круговая диаграмма' : 'Столбчатая диаграмма' }}
      </span>
    </div>

    <div class="chart-wrapper">
      <component
          :is="CurrentChart"
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
  padding: 16px 0;
}

.toggle-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
  text-align: center;
}

.toggle-text {
  font-size: 1.1rem;
  font-weight: 500;
  color: #374151;
}

.chart-wrapper {
  width: 100%;
  min-height: 380px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

@media (min-width: 480px) {
  .toggle-header {
    flex-direction: row;
    justify-content: center;
  }
}
</style>