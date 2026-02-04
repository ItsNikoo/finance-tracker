<script setup lang="ts">
const props = defineProps<{
  amount: number,
  isIncome: boolean,
}>()
</script>

<template>
  <div class="income-card">
    <div class="header">
      <span class="income-label">{{props.isIncome ? "Поступлений" : "Трат"}}</span>
      <span
        class="income-badge"
        :class="{ income: props.isIncome, expense: !props.isIncome }"
      >{{props.isIncome ? "+ Доход" : "- Расход"}}</span>
    </div>

    <div
      class="income-amount"
      :class="{ income: props.isIncome, expense: !props.isIncome }"
    >
      {{ props.amount.toLocaleString() }} ₽
    </div>

  </div>
</template>

<style scoped>
.income-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin: 20px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 140px;
  transition: 0.2s ease;
  cursor: pointer;
}

.income-card:hover {
  transform: translateY(-2px);
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

.income-badge {
  font-size: 12px;
  background: rgba(42, 121, 86, 0.1);
  color: #2A7956;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
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
