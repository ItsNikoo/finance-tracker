<script setup lang="ts">
import BalanceInfoWidget from "@/components/Dashboard/BalanceInfoWidget.vue"
import TotalBalanceWidget from "@/components/Dashboard/TotalBalanceWidget.vue"
import {useTransactionsStore} from "@/stores/transactions.ts"
import MonthToggle from "@/components/UI/MonthToggle.vue"
import ExpencesChartsContainer from "@/components/Charts/ExpencesChartsContainer.vue"
import TransactionList from "@/components/Dashboard/Transactions/TransactionList.vue";

const store = useTransactionsStore()
</script>

<template>
  <div class="analytics-page">
    <h1 class="title">Аналитика</h1>

    <MonthToggle class="month-toggle"/>

    <!-- Карточки -->
    <div class="stats-grid">
      <TotalBalanceWidget :balance="store.periodBalance"/>
      <BalanceInfoWidget :amount="store.periodIncome" :isIncome="true"/>
      <BalanceInfoWidget :amount="store.periodExpenses" :isIncome="false"/>
    </div>

    <!-- Графики 2/3 -->
    <div class="analytics-grid">
      <div class="charts-section">
        <ExpencesChartsContainer/>
      </div>
      <div class="expenses-section">
        <TransactionList
            :selectedCategory="store.selectedCategory"
            :onlyExpences="true"
            :title="'Расходы по категориям'"
        />
      </div>
      <div class="side-section">
        <!-- Можно добавить сюда сводку или оставить пустым -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  color: #313131;
  font-weight: 700;
  margin-bottom: 20px;
}

.month-toggle {
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 10px;
}

.analytics-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  gap: 20px;
}

.charts-section{
  min-width: 0;
}

.expenses-section{
  min-width: 0;
  margin-top: 16px;
}

.side-section {
  min-height: 200px;
}

@media (max-width: 1024px) {
  .analytics-page {
    padding: 0 40px 50px 40px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .analytics-grid {
    grid-template-columns: 1fr;
  }
}

/* ========================= */
/* 📱 Телефоны */
/* ========================= */

@media (max-width: 768px) {
  .analytics-page {
    padding: 0 20px 40px 20px;
  }

  .title {
    font-size: 22px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>