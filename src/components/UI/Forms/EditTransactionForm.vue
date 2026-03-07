<script setup lang="ts">
import {computed, ref, watch} from "vue"
import type {Transaction} from "@/types"
import {categories} from "@/lib/categories"
import {useTransactionsStore} from "@/stores/transactions"

const props = defineProps<{
  transaction: Transaction
}>()

const emit = defineEmits<{
  (e: "saved"): void
}>()

const store = useTransactionsStore()

const form = ref<Omit<Transaction, "id" | "date">>({
  title: "",
  amount: 0,
  isIncome: false,
  categoryId: ""
})

const error = ref<string | null>(null)

watch(
    () => props.transaction,
    (t) => {
      form.value = {
        title: t.title,
        amount: t.amount,
        isIncome: t.isIncome,
        categoryId: t.categoryId
      }
    },
    { immediate: true }
)

const availableCategories = computed(() => {
  return categories.filter(category =>
      form.value.isIncome
          ? category.type === "income"
          : category.type === "expense"
  )
})

watch(
    () => form.value.isIncome,
    () => form.value.categoryId = ""
)

function handleSubmit() {

  if (form.value.title.trim() === "") {
    error.value = "Выберите описание транзакции"
    return
  }

  if (form.value.amount <= 0) {
    error.value = "Сумма транзакции должна быть больше 0"
    return
  }

  if (!form.value.categoryId) {
    error.value = "Выберите категорию"
    return
  }

  store.updateTransaction({
    id: props.transaction.id,
    date: props.transaction.date,
    ...form.value
  })

  error.value = null
  emit("saved")
}
</script>

<template>
  <div class="form-container">
    <div class="form">

      <h2 class="form-title">
        Редактировать транзакцию
      </h2>

      <input
          type="text"
          v-model="form.title"
          placeholder="Описание транзакции"
          class="form-input"
      />

      <input
          type="number"
          v-model.number="form.amount"
          placeholder="Сумма"
          class="form-input"
      />

      <select v-model="form.isIncome" class="form-input">
        <option :value="false">Расход</option>
        <option :value="true">Доход</option>
      </select>

      <select
          v-model="form.categoryId"
          class="form-input"
      >
        <option value="" disabled>
          Выберите категорию
        </option>

        <option
            v-for="c in availableCategories"
            :key="c.id"
            :value="c.id"
        >
          {{ c.name }}
        </option>
      </select>

      <p class="error-alert">
        {{ error }}
      </p>

      <button
          type="button"
          @click="handleSubmit"
          class="form-button"
      >
        Сохранить изменения
      </button>

    </div>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  max-width: 420px;
}

.form-title {
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
}

.form-input {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #41B883;
}

.form-button {
  margin-top: 10px;
  padding: 12px;
  border-radius: 10px;
  border: none;

  background: #2A7956;
  color: white;
  font-weight: 600;
  font-size: 14px;

  cursor: pointer;
  transition: all 0.2s ease;
}

.form-button:hover {
  box-shadow: rgba(30, 87, 61, 0.5) 0 0 30px;
  transition: 300ms;
}

.error-alert {
  font-style: italic;
  font-size: 14px;
  color: #d9534f;
}
</style>