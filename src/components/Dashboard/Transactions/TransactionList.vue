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
  padding: 10px;
  max-height: 520px;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-width: 600px) {
  .transaction-list {
    padding: 5px;
  }
}
</style>
