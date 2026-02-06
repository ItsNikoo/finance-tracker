<script setup lang="ts">

import {computed, onMounted, ref, watch} from "vue"
import type {EntityProps} from "@/types.ts";
import MainLayout from "@/layouts/MainLayout.vue";
import MainPage from "@/components/MainPage.vue";
import Dashboard from "@/components/Dashboard/Dashboard.vue";

const STORAGE_KEY = "entities"

let nextId = 1

const transactions = ref<EntityProps[]>([])


watch(
  transactions,
  (newValue) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
  },
  {deep: true}
)

const totalIncome = computed(() => {
  let sum = 0
  for (const o of transactions.value) {
    if (o.isIncome) {
      sum += o.amount
    }
  }
  return sum
})

const totalExpenses = computed(() => {
  let sum = 0
  for (const o of transactions.value) {
    if (!o.isIncome) {
      sum += o.amount
    }
  }
  return sum
})

function loadDataFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY)
  if (data) {
    transactions.value = JSON.parse(data)
    if (transactions.value.length > 0) {
      const maxId = Math.max(...transactions.value.map(item => item.id))
      nextId = maxId + 1
    }
  }
}

onMounted(() => {
  loadDataFromLocalStorage()
})


function generateId(): number {
  return nextId++
}

function deleteTransaction(id: number) {
  transactions.value = transactions.value.filter(t => t.id !== id)
}

function handleSubmit(form: Omit<EntityProps, "id">) {
  if (form.amount <= 0) return

  transactions.value.push({
    id: generateId(),
    title: form.title.trim(),
    amount: form.amount,
    isIncome: form.isIncome,
    categoryId: form.categoryId,
  })
}
</script>

<template>
  <header>
  </header>

  <MainLayout>
    <div class="container">
      <MainPage/>
      <Dashboard
        @onSubmit="handleSubmit"
        :totalIncome="totalIncome"
        :totalExpenses="totalExpenses"
        :transactions="transactions"
        :on-delete="deleteTransaction"
      />

    </div>
  </MainLayout>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}


</style>
