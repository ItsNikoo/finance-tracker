<script setup lang="ts">
import {computed, ref, watch} from "vue"
import type {Transaction} from "@/types"
import {categories} from "@/lib/categories"
import {useTransactionsStore} from "@/stores/transactions"
import BaseInput from "@/components/Base/BaseInput.vue"
import BaseSelect from "@/components/Base/BaseSelect.vue"
import BaseButton from "@/components/Base/BaseButton.vue"

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

      <BaseInput
          v-model="form.title"
          type="text"
          placeholder="Описание транзакции"
      />

      <BaseInput
          v-model="form.amount"
          type="number"
          placeholder="Сумма"
      />

      <BaseSelect v-model="form.isIncome">
        <option :value="false">Расход</option>
        <option :value="true">Доход</option>
      </BaseSelect>

      <BaseSelect v-model="form.categoryId">
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
      </BaseSelect>

      <p class="error-alert">
        {{ error }}
      </p>

      <BaseButton @click="handleSubmit" full-width>
        Сохранить изменения
      </BaseButton>
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

.error-alert {
  font-style: italic;
  font-size: 14px;
  color: #d9534f;
}
</style>
