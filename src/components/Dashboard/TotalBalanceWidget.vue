<script setup lang="ts">
import {computed} from "vue";
import {useTransactionsStore} from "@/stores/transactions.ts";

const store = useTransactionsStore()

// Делаем computed, чтобы значения обновлялись при смене месяца
const totalBalance = computed(() => store.periodBalance)

const isPositive = computed(() => store.periodBalance >= 0)

// Форматированное значение с пробелами
const formattedBalance = computed(() => {
  const value = totalBalance.value
  const formatted = Math.abs(value).toLocaleString('ru-RU')
  return value >= 0 ? `+${formatted}` : `-${formatted}`
})

// Динамический заголовок в зависимости от выбранного периода
const periodLabel = computed(() => {
  if (store.selectedMonth === 'all') {
    return 'Общий баланс за все время'
  }
  return 'Баланс за выбранный месяц'
})
</script>

<template>
  <div class="balance-card">
    <div class="header">
      <span class="balance-label">{{ periodLabel }}</span>
    </div>

    <div
        class="balance-amount"
        :class="{ income: isPositive, expense: !isPositive }"
    >
      {{ formattedBalance }} ₽
    </div>
  </div>
</template>

<style scoped>
.balance-card {
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

.balance-card:hover {
  box-shadow: rgba(30, 87, 61, 0.25) 0 0 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.balance-label {
  font-size: 14px;
  color: #6b6b6b;
  font-weight: 500;
}

.balance-amount {
  margin-top: 20px;
  font-size: 32px;
  font-weight: 700;
  transition: color 0.2s ease;
}

.income {
  color: #2A7956;
}

.expense {
  color: #d9534f;
}

/* Анимация при изменении */
@media (prefers-reduced-motion: no-preference) {
  .balance-amount {
    animation: fadeIn 0.3s ease;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0.7;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>