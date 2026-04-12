import {defineStore} from "pinia"
import {ref, watch} from "vue"
import {buildAuthorizedHeaders, FINANCE_ENDPOINTS} from "@/lib/authContract"
import {defaultLimitSeed} from "@/lib/defaultFinanceData"
import {useAuthStore} from "@/stores/auth"
import {useTransactionsStore} from "@/stores/transactions"
import type {Limit} from "@/types"

interface BackendLimit {
  limit_id: number
  user_id: number
  category_id: number
  limit_amount: number | string
}

function mapLimit(limit: BackendLimit, categoryNameById: (categoryId: number) => string): Limit {
  return {
    id: limit.limit_id,
    categoryId: limit.category_id,
    name: categoryNameById(limit.category_id),
    limit: Number(limit.limit_amount)
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

export const useLimitsStore = defineStore("limits", () => {
  const authStore = useAuthStore()
  const transactionsStore = useTransactionsStore()

  const limits = ref<Limit[]>([])
  const isLoading = ref(false)
  const initializedUserId = ref<number | null>(null)

  async function fetchLimits() {
    if (!authStore.isAuthenticated) {
      limits.value = []
      return
    }

    await transactionsStore.ensureCategoriesLoaded()

    const response = await fetch(FINANCE_ENDPOINTS.limits, {
      method: "GET",
      credentials: "include",
      headers: buildAuthorizedHeaders()
    })

    if (!response.ok) {
      if (response.status === 401) {
        limits.value = []
        return
      }

      throw new Error(await readApiError(response, "Не удалось загрузить лимиты"))
    }

    const payload = await response.json() as BackendLimit[]
    limits.value = payload.map(limit => mapLimit(limit, transactionsStore.categoryNameById))
  }

  async function ensureDefaultLimits() {
    await fetchLimits()

    if (limits.value.length > 0) return

    for (const item of defaultLimitSeed) {
      const category = transactionsStore.categories.find(current => current.name === item.categoryName && current.type === "expense")
      if (!category) continue

      await fetch(FINANCE_ENDPOINTS.limits, {
        method: "POST",
        credentials: "include",
        headers: {
          ...buildAuthorizedHeaders(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category_id: category.id,
          limit_amount: item.amount
        })
      })
    }

    await fetchLimits()
  }

  async function initializeLimits() {
    const currentUserId = authStore.user?.userId ?? null

    if (currentUserId === null) {
      limits.value = []
      initializedUserId.value = null
      return
    }

    if (initializedUserId.value === currentUserId) return

    isLoading.value = true

    try {
      await ensureDefaultLimits()
      initializedUserId.value = currentUserId
    } finally {
      isLoading.value = false
    }
  }

  watch(
    () => authStore.user?.userId ?? null,
    async (userId) => {
      if (!userId) {
        limits.value = []
        initializedUserId.value = null
        return
      }

      await initializeLimits()
    },
    {immediate: true}
  )

  return {
    limits,
    isLoading,
    fetchLimits,
    initializeLimits
  }
})
