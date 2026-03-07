<script setup lang="ts">
import {computed} from "vue"
import BalanceInfoWidget from "@/components/Dashboard/BalanceInfoWidget.vue"
import {useTransactionsStore} from "@/stores/transactions"

const store = useTransactionsStore()

const avgIncome = computed(() =>
    Math.round(store.totalIncome / 12)
)

const avgExpenses = computed(() =>
    Math.round(store.totalExpenses / 12)
)
</script>

<template>
  <div class="short-stats-container">
    <BalanceInfoWidget
        title="Общий доход за год"
        :amount="store.totalIncome"
        :is-income="true"
    />

    <BalanceInfoWidget
        title="Средний доход в месяц"
        :amount="avgIncome"
        :is-income="true"
    />

    <BalanceInfoWidget
        title="Средние траты в месяц"
        :amount="avgExpenses"
        :is-income="false"
    />
  </div>
</template>

<style scoped>
.short-stats-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>