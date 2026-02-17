<script setup lang="ts">
import FormComponent from "@/components/FormComponent.vue";
import BalanceInfoCard from "@/components/Dashboard/BalanceInfoCard.vue";
import TotalBalanceCard from "@/components/Dashboard/TotalBalanceCard.vue";
import TransactionList from "@/components/Transactions/TransactionList.vue";
import {useTransactionsStore} from "@/stores/transactions.ts";
import ExpencesChartsContainer from "@/components/Charts/ExpencesChartsContainer.vue";
import MonthToggle from "@/components/UI/MonthToggle.vue";

const store = useTransactionsStore()
</script>

<template>
  <div class="dashboard">
    <MonthToggle/>

    <div class="dashboard-row top-row">
      <FormComponent/>
      <TotalBalanceCard :balance="store.periodBalance"/>
      <BalanceInfoCard :amount="store.periodIncome" :isIncome="true"/>
      <BalanceInfoCard :amount="store.periodExpenses" :isIncome="false"/>
    </div>

    <div class="dashboard-row bottom-row">
      <TransactionList :on-delete="store.deleteTransaction"/>
      <ExpencesChartsContainer/>
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

@media (max-width: 900px) {
  .bottom-row {
    grid-template-columns: 1fr;
  }
}
</style>