<script setup lang="ts">
import type {EntityProps} from "@/types.ts";
import TransactionCard from "@/components/Transactions/TransactionCard.vue";

const props = defineProps<{
  transactions: EntityProps[],
  onDelete?: (id: number) => void
}>()

</script>

<template>
  <div class="transaction-list">
    <div
      v-for="transaction in [...props.transactions].reverse()"
      :key="transaction.id"
    >
      <TransactionCard :on-delete="onDelete" :transaction="transaction"/>
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
  gap: 12px;

  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
}
</style>
