import {defineStore} from "pinia";
import {computed, ref, watch} from "vue";
import type {Limit, Transaction} from "@/types.ts";
import {generateMockTransactions} from "@/lib/mockGenerator.ts";
import {generateLimits} from "@/lib/limitGenerator.ts";
import {categories} from "@/lib/categories.ts";

export const useTransactionsStore = defineStore("transactions", () => {
  const STORAGE_KEY = "transactions"

  const transactions = ref<Transaction[]>([])
  let nextId = 1

  function loadDataFromLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
      try {
        const parsed = JSON.parse(data) as Transaction[];
        transactions.value = parsed;

        if (parsed.length > 0) {
          const maxId = Math.max(...parsed.map(item => item.id));
          nextId = maxId + 1;
        }
        return;
      } catch (err) {
        console.warn("Повреждённые данные → очищаем", err);
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    const mockGenerated = localStorage.getItem("mock_transactions_generated");

    if (mockGenerated === "true") {
      console.log("Моковые данные уже были сгенерированы ранее → пропускаем");
      transactions.value = [];
      return;
    }

    console.log("Генерируем mock-транзакции впервые...");
    generateMockTransactions()

    if (transactions.value.length > 0) {
      nextId = Math.max(...transactions.value.map(t => t.id)) + 1;
    }

    localStorage.setItem("mock_transactions_generated", "true");
  }

  loadDataFromLocalStorage()

  watch(
    transactions,
    (newValue) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
    },
    {deep: true}
  )

  const selectedMonth = ref<number | 'all'>('all')

  function setSelectedMonth(value: number | 'all') {
    selectedMonth.value = value
  }

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

  const groupedByMonth = computed(() => {
    const map = new Map<number, {
      month: number
      title: string
      income: number
      expense: number
      balance: number
      transactions: Transaction[]
    }>()

    transactions.value.forEach(t => {
      const monthNum = Number(t.date.split('-')[1]) // 01 → 1, 02 → 2, ...

      if (!map.has(monthNum)) {
        map.set(monthNum, {
          month: monthNum,
          title: new Date(2000, monthNum - 1, 1).toLocaleString('ru-RU', {month: 'long'}),
          income: 0,
          expense: 0,
          balance: 0,
          transactions: []
        })
      }

      const group = map.get(monthNum)!
      group.transactions.push(t)

      if (t.isIncome) group.income += t.amount
      else group.expense += t.amount
      group.balance = group.income - group.expense
    })

    // Сортировка от декабря к январю (или наоборот)
    return Array.from(map.values())
      .sort((a, b) => b.month - a.month) // новые сверху
  })

  const filteredTransactions = computed(() => {
    if (selectedMonth.value === 'all') {
      return transactions.value
    }

    // Находим группу по выбранному месяцу
    const group = groupedByMonth.value.find(g => g.month === selectedMonth.value)

    return group ? group.transactions : []
  })

  const groupedExpencesByCategory = computed(() => {
    const map = new Map<string, {
      categoryId: string,
      name: string,
      total: number,
      count: number,
      transactions: Transaction[]
    }>()

    const selected = selectedMonth.value

    const relevantTransactions = selected === 'all'
      ? transactions.value
      : transactions.value.filter(t => {
        const monthNum = Number(t.date.split('-')[1])
        return monthNum === selected
      })

    relevantTransactions
      .filter(t => !t.isIncome)
      .forEach(t => {
        if (!map.has(t.categoryId)) {
          const category = categories.find(c => c.id === t.categoryId)
          const name = category ? category.name : t.categoryId

          map.set(t.categoryId, {
            categoryId: t.categoryId,
            name,
            total: 0,
            count: 0,
            transactions: []
          })
        }

        const group = map.get(t.categoryId)!
        group.total += t.amount
        group.count += 1
        group.transactions.push(t)
      })

    return Array.from(map.values())
      .sort((a, b) => b.total - a.total)
  })

  const periodIncome = computed(() => {
    if (selectedMonth.value === 'all') {
      return totalIncome.value
    }

    // Используем уже подсчитанные данные из группы
    const group = groupedByMonth.value.find(g => g.month === selectedMonth.value)
    return group ? group.income : 0
  })

  const periodExpenses = computed(() => {
    if (selectedMonth.value === 'all') {
      return totalExpenses.value
    }

    const group = groupedByMonth.value.find(g => g.month === selectedMonth.value)
    return group ? group.expense : 0
  })

  const periodBalance = computed(() => {
    if (selectedMonth.value === 'all') {
      return totalIncome.value - totalExpenses.value
    }

    const group = groupedByMonth.value.find(g => g.month === selectedMonth.value)
    return group ? group.balance : 0
  })

  // Действия
  function generateId(): number {
    return nextId++
  }

  function addTransaction(form: Omit<Transaction, "id" | "date"> & { date: string }) {
    if (form.amount <= 0) return

    const date: string = form.date ?? new Date().toISOString().split('T')[0]

    transactions.value.push({
      id: generateId(),
      title: form.title.trim(),
      amount: form.amount,
      isIncome: form.isIncome,
      categoryId: form.categoryId,
      date,
    })
  }

  function deleteTransaction(id: number) {
    transactions.value = transactions.value.filter(t => t.id !== id)
  }

  return {
    transactions,
    totalIncome,
    totalExpenses,

    groupedExpencesByCategory,
    categoryExpenses: (categoryId: string) => groupedExpencesByCategory.value.find(g => g.categoryId === categoryId),

    addTransaction,
    deleteTransaction,

    selectedMonth,
    setSelectedMonth,
    filteredTransactions,
    periodIncome,
    periodExpenses,
    periodBalance,
  }
})