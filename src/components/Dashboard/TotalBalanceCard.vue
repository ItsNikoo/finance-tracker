<script setup lang="ts">
import {computed} from "vue";
import {useTransactionsStore} from "@/stores/transactions.ts";


const store = useTransactionsStore()

const totalBalance = computed(() => {
  return store.totalIncome - store.totalExpenses
})

const isPositive = computed(() => {
  return store.totalIncome - store.totalExpenses > 0;

})
</script>

<template>
  <div class="income-card">
    <div class="header">
      <span class="income-label">Общее материальное положение</span>
    </div>

    <div
      class="income-amount"
      :class="{ income: isPositive, expense: !isPositive }"
    >
      {{ totalBalance }} ₽
    </div>

  </div>
</template>

<style scoped>
.income-card {
  background: white;
  border-radius: 16px;
  padding: 24px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 140px;
  transition: 0.2s ease;
  cursor: pointer;
}

.income-card:hover {
  box-shadow: rgba(30, 87, 61, 0.25) 0 0 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.income-label {
  font-size: 14px;
  color: #6b6b6b;
  font-weight: 500;
}

.income-amount {
  margin-top: 20px;
  font-size: 28px;
  font-weight: 700;
  color: #2A7956;
}

.income {
  color: #2A7956;
}

.expense {
  color: #d9534f;
}
</style>
