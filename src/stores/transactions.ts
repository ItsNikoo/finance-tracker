import {defineStore} from "pinia";
import {computed, ref, watch} from "vue";
import type {Transaction} from "@/types.ts";

export const useTransactionsStore = defineStore("transactions", () => {
  // Состояние
  const STORAGE_KEY = "transactions"

  const transactions = ref<Transaction[]>([])
  let nextId = 1

  function loadDataFromLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return

    try {
      const parsed = JSON.parse(data) as Transaction[]
      transactions.value = parsed

      if (parsed.length > 0) {
        const maxId = Math.max(...parsed.map(item => item.id))
        nextId = maxId + 1
      }
    } catch (err) {
      console.warn("Повреждённые данные в localStorage →", err)
    }
  }

  loadDataFromLocalStorage()

  watch(
    transactions,
    (newValue) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
    },
    {deep: true}
  )

  // Геттеры
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

  // Действия
  function generateId(): number {
    return nextId++
  }

  function addTransaction(form: Omit<Transaction, "id">) {
    if (form.amount <= 0) return

    transactions.value.push({
      id: generateId(),
      title: form.title.trim(),
      amount: form.amount,
      isIncome: form.isIncome,
      categoryId: form.categoryId,
    })
  }

  function deleteTransaction(id: number) {
    transactions.value = transactions.value.filter(t => t.id !== id)
  }

  return {
    transactions,
    totalIncome,
    totalExpenses,
    addTransaction,
    deleteTransaction,
  }
})
