<script setup lang="ts">
import type {EntityProps} from "@/types.ts";

const props = defineProps<{
  transaction: EntityProps
  onDelete?: (id: number) => void
}>()

function handleDelete() {
  if (props.onDelete) {
    props.onDelete(props.transaction.id)
  }
}
</script>

<template>
  <div
    class="transaction-card"
    :class="{ income: props.transaction.isIncome, expense: !props.transaction.isIncome }"
  >
    <div class="left">
      <div class="type-wrapper">
        <span
          class="dot"
          :class="props.transaction.isIncome ? 'dot-income' : 'dot-expense'"
        ></span>
        <span class="type-text">
          {{ props.transaction.isIncome ? "Доход" : "Расход" }}
        </span>
      </div>

      <h3 class="title">{{ props.transaction.title || "Без описания" }}</h3>
    </div>

    <div class="right">
      <p class="amount"
         :class="{ positive: props.transaction.isIncome, negative: !props.transaction.isIncome }">
        {{
          props.transaction.isIncome ? "+" : "-"
        }}{{ props.transaction.amount.toLocaleString("ru-RU") }} ₽
      </p>
      <button @click="handleDelete" class="remove-button">
        <img class="remove-icon" src="/trash-can.png" alt="Удалить">
      </button>
    </div>
  </div>
</template>

<style scoped>
.transaction-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: white;
  border-radius: 16px;
  padding: 0 20px;
  min-height: 94px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.22s ease;
  cursor: default;
}

.transaction-card:hover {
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.12);
}

/* ──────────────────────────────────────── */

.left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.type-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.type-text {
  font-size: 13px;
  font-weight: 500;
  color: #6b7280; /* серый для "Доход" / "Расход" */
  letter-spacing: 0.2px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-income {
  background-color: #2a7956;
}

.dot-expense {
  background-color: #d9534f;
}

.title {
  font-size: 17px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.3;
  margin: 0;
}

/* ──────────────────────────────────────── */

.right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.amount {
  font-size: 19px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.positive {
  color: #2a7956;
}

.negative {
  color: #d9534f;
}

.remove-button {
  width: 32px;
  height: 32px;
  background: #ffffff; /* очень светло-красный фон */
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  flex-shrink: 0;
}

.remove-button:hover {
  background: #d9534f;
  transform: scale(1.12);
}

.remove-button:active {
  transform: scale(0.96);
}

.remove-icon {
  width: 18px;
  height: 18px;
  filter: brightness(0.85) contrast(1.1);
  transition: filter 0.18s ease;
}

.remove-button:hover .remove-icon {
  filter: brightness(0.4) contrast(1.2) sepia(0.1);
}
</style>
