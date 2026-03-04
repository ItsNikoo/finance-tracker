<script setup lang="ts">
import type { Transaction } from "@/types.ts";
import { useTransactionsStore } from "@/stores/transactions.ts";
import { categories } from "@/lib/categories.ts";

const props = defineProps<{
  transaction: Transaction;
}>();

const store = useTransactionsStore();

function handleDelete() {
  store.deleteTransaction(props.transaction.id);
}

function categoryTitleMapper(id: string) {
  return categories.find(category => category.id === id)?.name;
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
        />
        <span class="type-text">
          {{ props.transaction.isIncome ? "Доход" : "Расход" }} |
          {{ categoryTitleMapper(props.transaction.categoryId) }}
        </span>
      </div>

      <h3 class="title">
        {{ props.transaction.title || "Без описания" }}
      </h3>
    </div>

    <div class="right">
      <p
          class="amount"
          :class="{ positive: props.transaction.isIncome, negative: !props.transaction.isIncome }"
      >
        {{ props.transaction.isIncome ? "+" : "-" }}
        {{ props.transaction.amount.toLocaleString("ru-RU") }} ₽
      </p>

      <button @click="handleDelete" class="remove-button">
        <img class="remove-icon" src="/trash-can.png" alt="Удалить" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.transaction-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;

  background: white;
  border-radius: 12px;
  padding: 0 20px;
  min-height: 94px;

  border: 1px solid rgba(42, 121, 86, 0.2);
}

/* ───────── LEFT ───────── */

.left {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

.type-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.type-text {
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  letter-spacing: 0.2px;

  min-width: 0;
  max-width: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

  min-width: 0;
  max-width: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ───────── RIGHT ───────── */

.right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
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
  background: #ffffff;
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
  transition: filter 0.18s ease;
}

/* ───────── АДАПТИВ ───────── */

@media (max-width: 600px) {
  .transaction-card {
    padding: 14px 16px;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .left {
    width: 100%;
  }

  .type-text {
    white-space: normal;
  }

  .title {
    white-space: normal;
    word-break: break-word;
  }

  .right {
    width: 100%;
    justify-content: space-between;
  }
}
</style>