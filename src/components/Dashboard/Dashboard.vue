<script setup lang="ts">
import FormComponent from "@/components/FormComponent.vue";
import BalanceInfoWidget from "@/components/Dashboard/BalanceInfoWidget.vue";
import TotalBalanceWidget from "@/components/Dashboard/TotalBalanceWidget.vue";
import TransactionList from "@/components/Dashboard/Transactions/TransactionList.vue";
import {useTransactionsStore} from "@/stores/transactions.ts";
import ExpencesChartsContainer from "@/components/Charts/ExpencesChartsContainer.vue";
import MonthToggle from "@/components/UI/MonthToggle.vue";
import LimitsWidget from "@/components/Dashboard/Limits/LimitsWidget.vue";

const store = useTransactionsStore()
</script>

<template>
  <div class="dashboard">
    <MonthToggle/>

    <div class="dashboard-row top-row">
      <FormComponent/>
      <TotalBalanceWidget :balance="store.periodBalance"/>
      <BalanceInfoWidget :amount="store.periodIncome" :isIncome="true"/>
      <BalanceInfoWidget :amount="store.periodExpenses" :isIncome="false"/>
    </div>

    <div class="dashboard-row bottom-row">
      <TransactionList :on-delete="store.deleteTransaction"/>
<!--      <ExpencesChartsContainer/>-->
      <LimitsWidget/>
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