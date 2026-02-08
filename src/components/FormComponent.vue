<script setup lang="ts">
import {computed, ref, watch} from "vue";
import type {EntityProps} from "@/types.ts";
import {categories} from "@/categories.ts";
import {useTransactionsStore} from "@/stores/transactions.ts";

const form = ref<Omit<EntityProps, "id">>({
  title: '',
  amount: 0,
  isIncome: false,
  categoryId: '' as string,
})

const error = ref<string | null>(null)

const store = useTransactionsStore()

const availableCategories = computed(() => {
  return categories.filter(category =>
    form.value.isIncome
      ? category.type === 'income'
      : category.type === 'expense'
  )
})

watch(
  () => form.value.isIncome,
  () => form.value.categoryId = ''
)

function handleSubmit() {
  if (form.value.title.trim() === ""){
    error.value = "Выберите описание транзакции"
    return
  }
  if (form.value.amount <= 0){
    error.value = "Сумма транзакции должна быть больше 0"
    return
  }
  if (!form.value.categoryId) {
    error.value = "Выберите категорию"
    return
  }
  store.addTransaction(form.value)
  error.value = null
  form.value = {title: "", amount: 0, isIncome: false, categoryId: ''}
}
</script>

<template>
  <div class="form-container">
    <div class="form">
      <h2 class="form-title">Добавить транзакцию</h2>

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
        class="form-input">
        <option value="" disabled selected>Выберите категорию</option>
        <option
          v-for="c in availableCategories"
          :key="c.id"
          :value="c.id"
        >
          {{ c.name }}
        </option>
      </select>

      <p class="error-alert">{{ error }}</p>

      <button
        type="button"
        @click="handleSubmit()"
        class="form-button"
      >
        Зафиксировать
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

  padding: 30px;

  width: 100%;
  max-width: 420px;

  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: 0.2s ease;
}

.form:hover {
  box-shadow: rgba(30, 87, 61, 0.25) 0 0 20px;
  transform: translateY(-2px);
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

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.checkbox-wrapper input {
  width: 16px;
  height: 16px;
  cursor: pointer;
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

.form-button:active {
  transform: translateY(0);
}

.error-alert{
  font-style: italic;
  font-size: 14px;
  color: #d9534f;
}
</style>
