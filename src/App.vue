<script setup lang="ts">
import TransactionCard from "@/components/TransactionCard.vue";

import {onMounted, ref, watch} from "vue"
import FormComponent from "@/components/FormComponent.vue";
import type {EntityProps} from "@/types.ts";

const STORAGE_KEY = "entities"

let nextId = 1

const objects = ref<EntityProps[]>([])

watch(
  objects,
  (newValue) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
  },
  {deep: true}
)

function loadDataFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY)
  if (data) {
    objects.value = JSON.parse(data)
    if (objects.value.length > 0) {
      const maxId = Math.max(...objects.value.map(item => item.id))
      nextId = maxId + 1
    }
  }
}

onMounted(() => {
  loadDataFromLocalStorage()
})

//
function generateId(): number {
  return nextId++
}

function handleSubmit(form: Omit<EntityProps, "id">) {
  if (form.amount <= 0) return

  objects.value.push({
    id: generateId(),
    title: form.title.trim(),
    amount: form.amount,
    isIncome: form.isIncome,
  })
}
</script>

<template>
  <header>
  </header>

  <main>
    <div class="container">
      <FormComponent @onSubmit="handleSubmit"/>
      <div class="transaction-container">
        <div class="transaction-list">
          <div
            v-for="transaction in [...objects].reverse()"
            :key="transaction.id"
          >
            <TransactionCard :transaction="transaction"/>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.transaction-container {
  text-align: center;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 20px auto;
  max-width: 500px;
}


</style>
