<script setup lang="ts">
import type {EntityProps} from "@/types.ts";

defineProps<{
  transaction: EntityProps
}
>()
</script>

<template>
  <div
    class="transaction-card">
    <div class="left">
      <p class="type">
        <span
          class="dot"
          :class="transaction.isIncome ? 'dot-income' : 'dot-expense'"
        ></span>
        {{ transaction.isIncome ? "Доход" : "Расход" }}
      </p>

      <h3 class="title">{{ transaction.title }}</h3>
    </div>

    <div class="right">
      <p class="amount">
        {{ transaction.isIncome ? "+" : "-" }}{{ transaction.amount }} ₽
      </p>
    </div>
  </div>
</template>


<style scoped>
.transaction-card {
  display: flex;
  justify-content: space-between;
  border-radius: 16px;
  padding: 8px 16px;
  border: 1px solid #41B847;
}

.left {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.title{
  font-size: 20px;
  padding: 5px 0;
}

.right{
  display: flex;
  align-items: center;
}

.amount {
  font-size: 18px;
  font-weight: 700;
}


.type {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot-income {
  background-color: #22c55e;
}

.dot-expense {
  background-color: #ef4444;
}

</style>
