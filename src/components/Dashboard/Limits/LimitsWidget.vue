<script setup lang="ts">
import {useLimitsStore} from "@/stores/limits.ts";
import {useTransactionsStore} from "@/stores/transactions.ts";
import LimitCard from "@/components/Dashboard/Limits/LimitCard.vue";

const store = useLimitsStore()
const transactionsStore = useTransactionsStore()
</script>

<template>
  <div class="limits-container">
    <LimitCard
        v-for="limit in store.limits"
        :key="limit.categoryId"
        :limit="limit"
        :expences="transactionsStore.categoryExpenses(limit.categoryId)?.total || 0"
    />
  </div>
</template>

<style scoped>
.limits-container {
  display: flex;
  max-height: 520px;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  flex-direction: column;
  gap: 10px;
}
</style>