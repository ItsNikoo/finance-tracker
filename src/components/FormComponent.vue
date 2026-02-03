<script setup lang="ts">
import {ref} from "vue";
import type {EntityProps} from "@/types.ts";

const form = ref<Omit<EntityProps, "id">>({
  title: '',
  amount: 0,
  isIncome: false,
})

const emit = defineEmits<{
  (e: "onSubmit", form: Omit<EntityProps, "id">): void
}>()

function handleSubmit() {
  emit("onSubmit", form.value)
  form.value = {title: "", amount: 0, isIncome: false}
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

      <label class="checkbox-wrapper">
        <input type="checkbox" v-model="form.isIncome"/>
        <span>Пополнение</span>
      </label>

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
  margin: 30px;

  width: 100%;
  max-width: 420px;

  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
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
  transform: translateY(-2px);
  box-shadow: 0 3px 20px rgba(22, 70, 51, 0.51);
}

.form-button:active {
  transform: translateY(0);
}
</style>
