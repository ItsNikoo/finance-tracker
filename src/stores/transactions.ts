import {defineStore} from "pinia"
import {computed, ref, watch} from "vue"
import {buildAuthorizedHeaders, FINANCE_ENDPOINTS} from "@/lib/authContract"
import {defaultCategorySeed} from "@/lib/defaultFinanceData"
import {useAuthStore} from "@/stores/auth"
import type {Category, CategorySelection, Transaction} from "@/types"

interface BackendCategory {
  category_id: number
  category_name: string
  category_type: string
}

interface BackendTransaction {
  transaction_id: number
  user_id: number
  amount: number | string
  comment: string | null
  date: string
  is_income: boolean
  category_id: number
}

interface TransactionDraft {
  title: string
  amount: number
  isIncome: boolean
  categoryId: number
  date: string
}

function normalizeCategoryType(type: string): "income" | "expense" {
  return type === "income" || type === "доход" ? "income" : "expense"
}

function mapCategory(category: BackendCategory): Category {
  return {
    id: category.category_id,
    name: category.category_name,
    type: normalizeCategoryType(category.category_type)
  }
}

function mapTransaction(transaction: BackendTransaction): Transaction {
  return {
    id: transaction.transaction_id,
    title: transaction.comment?.trim() || "Без описания",
    amount: Number(transaction.amount),
    isIncome: transaction.is_income,
    categoryId: transaction.category_id,
    date: transaction.date
  }
}

async function readApiError(response: Response, fallbackMessage: string) {
  try {
    const data = await response.json()
    if (typeof data?.detail === "string") return data.detail
  } catch {
    return fallbackMessage
  }

  return fallbackMessage
}

export const useTransactionsStore = defineStore("transactions", () => {
  const authStore = useAuthStore()

  const transactions = ref<Transaction[]>([])
  const categories = ref<Category[]>([])
  const selectedMonth = ref<number | "all">(new Date().getMonth() + 1)
  const selectedCategory = ref<string>("Все")
  const isLoading = ref(false)
  const isCategoriesLoading = ref(false)
  const initializedUserId = ref<number | null>(null)

  function setSelectedMonth(value: number | "all") {
    selectedMonth.value = value
  }

  function setSelectedCategory(category: string) {
    selectedCategory.value =
      selectedCategory.value === category
        ? "Все"
        : category
  }

  const categoryMap = computed(() =>
    new Map(categories.value.map(category => [category.id, category]))
  )

  function categoryNameById(categoryId: number) {
    return categoryMap.value.get(categoryId)?.name || `Категория #${categoryId}`
  }

  async function fetchCategories() {
    const response = await fetch(FINANCE_ENDPOINTS.categories, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })

    if (!response.ok) {
      throw new Error(await readApiError(response, "Не удалось загрузить категории"))
    }

    const payload = await response.json() as BackendCategory[]
    categories.value = payload.map(mapCategory)
  }

  async function ensureCategoriesLoaded() {
    if (isCategoriesLoading.value) return

    isCategoriesLoading.value = true

    try {
      await fetchCategories()

      if (categories.value.length === 0) {
        for (const category of defaultCategorySeed) {
          await fetch(FINANCE_ENDPOINTS.categories, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              category_name: category.name,
              category_type: category.type
            })
          })
        }

        await fetchCategories()
      }
    } finally {
      isCategoriesLoading.value = false
    }
  }

  async function fetchTransactions() {
    if (!authStore.isAuthenticated) {
      transactions.value = []
      return
    }

    await ensureCategoriesLoaded()

    const response = await fetch(FINANCE_ENDPOINTS.transactions, {
      method: "GET",
      credentials: "include",
      headers: buildAuthorizedHeaders()
    })

    if (!response.ok) {
      if (response.status === 401) {
        transactions.value = []
        return
      }

      throw new Error(await readApiError(response, "Не удалось загрузить транзакции"))
    }

    const payload = await response.json() as BackendTransaction[]
    transactions.value = payload.map(mapTransaction)
  }

  async function initializeTransactions() {
    const currentUserId = authStore.user?.userId ?? null

    if (currentUserId === null) {
      transactions.value = []
      initializedUserId.value = null
      return
    }

    if (initializedUserId.value === currentUserId) return

    isLoading.value = true

    try {
      await fetchTransactions()
      initializedUserId.value = currentUserId
    } finally {
      isLoading.value = false
    }
  }

  const totalIncome = computed(() =>
    transactions.value
      .filter(transaction => transaction.isIncome)
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  )

  const totalExpenses = computed(() =>
    transactions.value
      .filter(transaction => !transaction.isIncome)
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  )

  const groupedByMonth = computed(() => {
    const map = new Map<number, {
      month: number
      title: string
      income: number
      expense: number
      balance: number
      transactions: Transaction[]
    }>()

    transactions.value.forEach(transaction => {
      const monthNum = Number(transaction.date.split("-")[1])

      if (!map.has(monthNum)) {
        map.set(monthNum, {
          month: monthNum,
          title: new Date(2000, monthNum - 1, 1).toLocaleString("ru-RU", {month: "long"}),
          income: 0,
          expense: 0,
          balance: 0,
          transactions: []
        })
      }

      const group = map.get(monthNum)
      if (!group) return

      group.transactions.push(transaction)

      if (transaction.isIncome) group.income += transaction.amount
      else group.expense += transaction.amount

      group.balance = group.income - group.expense
    })

    return Array.from(map.values()).sort((a, b) => b.month - a.month)
  })

  const filteredTransactions = computed(() => {
    if (selectedMonth.value === "all") {
      return transactions.value
    }

    const group = groupedByMonth.value.find(item => item.month === selectedMonth.value)
    return group ? group.transactions : []
  })

  const groupedExpencesByCategory = computed(() => {
    const map = new Map<number, CategorySelection>()

    const relevantTransactions = selectedMonth.value === "all"
      ? transactions.value
      : transactions.value.filter(transaction => Number(transaction.date.split("-")[1]) === selectedMonth.value)

    relevantTransactions
      .filter(transaction => !transaction.isIncome)
      .forEach(transaction => {
        if (!map.has(transaction.categoryId)) {
          map.set(transaction.categoryId, {
            categoryId: transaction.categoryId,
            name: categoryNameById(transaction.categoryId),
            total: 0,
            count: 0,
            transactions: []
          })
        }

        const group = map.get(transaction.categoryId)
        if (!group) return

        group.total += transaction.amount
        group.count += 1
        group.transactions.push(transaction)
      })

    return Array.from(map.values()).sort((a, b) => b.total - a.total)
  })

  const periodIncome = computed(() => {
    if (selectedMonth.value === "all") return totalIncome.value
    return groupedByMonth.value.find(group => group.month === selectedMonth.value)?.income || 0
  })

  const periodExpenses = computed(() => {
    if (selectedMonth.value === "all") return totalExpenses.value
    return groupedByMonth.value.find(group => group.month === selectedMonth.value)?.expense || 0
  })

  const periodBalance = computed(() => {
    if (selectedMonth.value === "all") return totalIncome.value - totalExpenses.value
    return groupedByMonth.value.find(group => group.month === selectedMonth.value)?.balance || 0
  })

  async function addTransaction(form: TransactionDraft) {
    const response = await fetch(FINANCE_ENDPOINTS.transactions, {
      method: "POST",
      credentials: "include",
      headers: {
        ...buildAuthorizedHeaders(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: form.amount,
        comment: form.title.trim(),
        date: form.date,
        is_income: form.isIncome,
        category_id: form.categoryId
      })
    })

    if (!response.ok) {
      throw new Error(await readApiError(response, "Не удалось создать транзакцию"))
    }

    const payload = await response.json() as BackendTransaction
    transactions.value.push(mapTransaction(payload))
  }

  async function updateTransaction(updated: Transaction) {
    // Backend does not expose transaction update endpoint yet,
    // so we safely emulate edit via delete + create to keep data on the server.
    await deleteTransaction(updated.id)
    await addTransaction({
      title: updated.title,
      amount: updated.amount,
      isIncome: updated.isIncome,
      categoryId: updated.categoryId,
      date: updated.date
    })
  }

  async function deleteTransaction(id: number) {
    const response = await fetch(`${FINANCE_ENDPOINTS.transactions}/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: buildAuthorizedHeaders()
    })

    if (!response.ok) {
      throw new Error(await readApiError(response, "Не удалось удалить транзакцию"))
    }

    transactions.value = transactions.value.filter(transaction => transaction.id !== id)
  }

  watch(
    () => authStore.user?.userId ?? null,
    async (userId) => {
      if (!userId) {
        transactions.value = []
        initializedUserId.value = null
        selectedCategory.value = "Все"
        return
      }

      await initializeTransactions()
    },
    {immediate: true}
  )

  return {
    transactions,
    categories,
    isLoading,
    totalIncome,
    totalExpenses,
    groupedExpencesByCategory,
    categoryExpenses: (categoryId: number) => groupedExpencesByCategory.value.find(group => group.categoryId === categoryId),
    addTransaction,
    updateTransaction,
    deleteTransaction,
    groupedByMonth,
    selectedMonth,
    setSelectedMonth,
    selectedCategory,
    setSelectedCategory,
    filteredTransactions,
    periodIncome,
    periodExpenses,
    periodBalance,
    ensureCategoriesLoaded,
    initializeTransactions,
    fetchTransactions,
    categoryNameById
  }
})
