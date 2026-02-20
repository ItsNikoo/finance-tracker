<script setup lang="ts">

import MainPage from "@/components/MainPage.vue";
import Dashboard from "@/components/Dashboard/Dashboard.vue";
import {useTransactionsStore} from "@/stores/transactions.ts";

const store = useTransactionsStore()

</script>

<template>
  <div class="container">
    <MainPage/>
    <Dashboard/>
  </div>
  <pre>{{ store.filteredTransactions }}</pre>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>