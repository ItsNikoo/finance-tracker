<script setup lang="ts">
import {computed} from "vue"
import TransactionCard from "@/components/Dashboard/Transactions/TransactionCard.vue"
import {useTransactionsStore} from "@/stores/transactions"
import type {Transaction} from "@/types"

const props = defineProps<{
  onlyExpences: boolean
  selectedCategory?: string
  title: string
}>()

const store = useTransactionsStore()

const transactions = computed<Transaction[]>(() => {
  if ((!props.selectedCategory || props.selectedCategory === "Все") && props.onlyExpences) {
    return store.filteredTransactions.filter(transaction => !transaction.isIncome)
  }

  if ((!props.selectedCategory || props.selectedCategory === "Все") && !props.onlyExpences) {
    return store.filteredTransactions
  }

  const category = store.groupedExpencesByCategory.find(item => item.name === props.selectedCategory)
  return category?.transactions ?? []
})
</script>

<template>
  <div>
    <div class="header-text">
      <h3 class="card-title">{{ props.title }}</h3>
      <p v-if="props.onlyExpences" class="card-subtitle">
        Категория: {{ props.selectedCategory }}
      </p>
    </div>

    <div class="transaction-list">
      <div
          v-for="transaction in transactions.slice().reverse()"
          :key="transaction.id"
      >
        <TransactionCard :transaction="transaction"/>
      </div>
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
  gap: 2px;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.header-text {
  padding: 16px 0;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.card-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 4px 0 0 0;
}

@media (max-width: 600px) {
  .transaction-list {
    padding: 5px;
  }
}
</style>
