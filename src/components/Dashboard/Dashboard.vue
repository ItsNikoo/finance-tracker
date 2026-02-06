<script setup lang="ts">
import FormComponent from "@/components/FormComponent.vue";
import type {EntityProps} from "@/types.ts";
import BalanceInfoCard from "@/components/Dashboard/BalanceInfoCard.vue";
import TotalBalanceCard from "@/components/Dashboard/TotalBalanceCard.vue";
import TransactionList from "@/components/Transactions/TransactionList.vue";

const props = defineProps<{
  totalIncome: number,
  totalExpenses: number,
  transactions: EntityProps[],
  onDelete?: (id: number) => void
}>()

const emit = defineEmits<{
  (e: "onSubmit", form: Omit<EntityProps, "id">): void
}>()

function handleSubmit(form: Omit<EntityProps, "id">): void {
  emit("onSubmit", form);
}

</script>

<template>
  <div class="dashboard">
    <div class="dashboard-row top-row">
      <FormComponent @onSubmit="handleSubmit"/>
      <TotalBalanceCard :totalIncome="props.totalIncome" :totalExpenses="props.totalExpenses" />
      <BalanceInfoCard :amount="props.totalIncome" :isIncome="true"/>
      <BalanceInfoCard :amount="props.totalExpenses" :isIncome="false"/>
    </div>

    <div class="dashboard-row bottom-row">
      <TransactionList :on-delete="onDelete" :transactions="props.transactions" />
      <div class="grid-container">2</div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dashboard-row {
  display: grid;
  gap: 20px;
}

.top-row {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.bottom-row {
  grid-template-columns: 1fr 1fr;
}

.grid-container {
  background-color: pink;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  font-size: 2rem;
}

@media (max-width: 900px) {
  .bottom-row {
    grid-template-columns: 1fr;
  }
}
</style>
