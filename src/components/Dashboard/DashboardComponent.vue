<script setup lang="ts">
import FormComponent from "@/components/UI/Forms/FormComponent.vue"
import BalanceInfoWidget from "@/components/Dashboard/BalanceInfoWidget.vue"
import TotalBalanceWidget from "@/components/Dashboard/TotalBalanceWidget.vue"
import {useTransactionsStore} from "@/stores/transactions.ts"
import MonthToggle from "@/components/UI/MonthToggle.vue"
import LimitsWidget from "@/components/Dashboard/Limits/LimitsWidget.vue"
import {ref} from "vue"
import ModalWindow from "@/components/UI/ModalWindow.vue"
import TransactionList from "@/components/Dashboard/Transactions/TransactionList.vue"

const store = useTransactionsStore()
const isModalOpen = ref<boolean>(false)
</script>

<template>
  <div class="dashboard">
    <MonthToggle/>

    <div class="dashboard-row top-row">
      <button class="add-transaction-card" @click="isModalOpen = true">
        Добавить транзакцию
      </button>

      <ModalWindow v-model="isModalOpen">
        <FormComponent/>
      </ModalWindow>
      <TotalBalanceWidget :balance="store.periodBalance"/>
      <BalanceInfoWidget :title="'Доход'" :amount="store.periodIncome" :isIncome="true"/>
      <BalanceInfoWidget :title="'Трат'" :amount="store.periodExpenses" :isIncome="false"/>
    </div>

    <div class="dashboard-row bottom-row">
        <TransactionList :title="'Транзакции'" :only-expences="false" />
      <div>
        <h3 class="container-title">Лимиты</h3>
        <LimitsWidget/>
      </div>
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

.add-transaction-card{
  background: #2A7956;
  color: white;
  border-radius: 12px;
  padding: 24px;

  font-size: 18px;
  font-weight: bolder;
  border: none;

  cursor: pointer;
}

.add-transaction-card:active{
  background-color: #1E573D;
}

.container-title{
  color: #313131;
  font-size: 20px;
  margin-bottom: 10px;
}

@media (max-width: 900px) {
  .bottom-row {
    grid-template-columns: 1fr;
  }
}
</style>