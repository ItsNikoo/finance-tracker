<script setup lang="ts">
import TransactionCard from "@/components/Dashboard/Transactions/TransactionCard.vue";
import {useTransactionsStore} from "@/stores/transactions.ts";


const store = useTransactionsStore()
</script>

<template>
  <div class="transaction-list">
    <div
      v-for="transaction in [...store.filteredTransactions].reverse()"
      :key="transaction.id"
    >
      <TransactionCard :transaction="transaction"/>
    </div>
  </div>
</template>

<style scoped>
.transaction-list {
  max-height: 520px;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  display: flex;
  flex-direction: column;
  gap: 10px;

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

/* Chrome / Edge / Safari */
.transaction-list::-webkit-scrollbar {
  width: 6px;
}

.transaction-list::-webkit-scrollbar-track {
  background: transparent;
}

.transaction-list::-webkit-scrollbar-thumb {
  background: rgba(42, 121, 86, 0.25);
  border-radius: 10px;
  transition: background 0.2s ease;
}

.transaction-list::-webkit-scrollbar-thumb:hover {
  background: rgba(42, 121, 86, 0.45);
}

@media (max-width: 600px) {
  .transaction-list {
    padding: 5px;
  }
}
</style>
