<script setup lang="ts">
import type {Transaction} from "@/types.ts";
import {useTransactionsStore} from "@/stores/transactions.ts";
import {categories} from "@/lib/categories.ts";

const props = defineProps<{
  transaction: Transaction
}>()

const store = useTransactionsStore()

function handleDelete() {
  store.deleteTransaction(props.transaction.id)
}

function categoryTitleMapper(id: string) {
  return categories.find(category => category.id === id)?.name
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
          {{ props.transaction.isIncome ? "Доход" : "Расход" }} | {{ categoryTitleMapper(props.transaction.categoryId)}}
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

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: default;
}

.transaction-card:hover {
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.1);
}

/* ──────────────────────────────────────── */

.left {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0; /* Важно для обрезки текста */
}

.type-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.type-text {
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px; /* Ограничиваем ширину текста категории */
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px; /* Ограничиваем ширину заголовка */
}

/* ──────────────────────────────────────── */

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
  filter: brightness(0.85) contrast(1.1);
  transition: filter 0.18s ease;
}

.remove-button:hover .remove-icon {
  filter: brightness(0.4) contrast(1.2) sepia(0.1);
}

/* ========== АДАПТИВНОСТЬ ========== */

/* Планшеты и небольшие десктопы */
@media (max-width: 768px) {
  .transaction-card {
    padding: 0 16px;
    min-height: 84px;
  }

  .title {
    font-size: 16px;
    max-width: 250px;
  }

  .amount {
    font-size: 18px;
  }

  .type-text {
    max-width: 180px;
  }
}

/* Мобильные устройства */
@media (max-width: 600px) {
  .transaction-card {
    padding: 12px 16px;
    min-height: auto;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    background-color: white; /* убираем розовый фон */
  }

  .left {
    gap: 8px;
    width: 100%;
  }

  .type-wrapper {
    width: 100%;
  }

  .type-text {
    font-size: 12px;
    max-width: none; /* убираем ограничение на мобильных */
    white-space: normal; /* разрешаем перенос текста */
    overflow: visible;
  }

  .title {
    font-size: 18px;
    max-width: none;
    white-space: normal;
    word-break: break-word;
  }

  .right {
    width: 100%;
    justify-content: space-between;
    gap: 12px;
  }

  .amount {
    font-size: 20px;
  }

  .remove-button {
    width: 40px;
    height: 40px;
  }

  .remove-icon {
    width: 20px;
    height: 20px;
  }
}

/* Маленькие мобильные устройства */
@media (max-width: 480px) {
  .transaction-card {
    padding: 10px 12px;
    gap: 10px;
  }

  .type-text {
    font-size: 11px;
  }

  .title {
    font-size: 16px;
  }

  .amount {
    font-size: 18px;
  }

  .remove-button {
    width: 36px;
    height: 36px;
  }

  .remove-icon {
    width: 18px;
    height: 18px;
  }
}

/* Очень маленькие устройства */
@media (max-width: 360px) {
  .transaction-card {
    padding: 8px 10px;
  }

  .type-wrapper {
    flex-wrap: wrap; /* переносим текст на новую строку, если совсем нет места */
  }

  .type-text {
    width: calc(100% - 18px); /* учитываем ширину точки */
  }

  .right {
    flex-wrap: wrap;
    gap: 8px;
  }

  .remove-button {
    width: 32px;
    height: 32px;
  }
}

/* Для устройств с большим экраном */
@media (min-width: 1200px) {
  .transaction-card {
    padding: 0 24px;
    min-height: 104px;
  }

  .title {
    font-size: 18px;
    max-width: 400px;
  }

  .amount {
    font-size: 20px;
  }

  .type-text {
    font-size: 14px;
    max-width: 250px;
  }
}

</style>