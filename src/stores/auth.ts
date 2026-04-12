import {defineStore} from "pinia"
import {computed, ref} from "vue"
import {
  AUTH_ENDPOINTS,
  buildLoginPayload,
  buildRegisterPayload,
  normalizeAuthEmail
} from "@/lib/authContract"
import type {
  AuthBackendTokenResponse,
  AuthBackendUserResponse,
  AuthLoginFormValues,
  AuthModalMode,
  AuthRegisterFormValues,
  AuthUser
} from "@/types/auth"

const ACCESS_TOKEN_STORAGE_KEY = "auth_access_token"

function readAccessToken(): string | null {
  if (typeof window === "undefined") return null
  return window.sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
}

function writeAccessToken(token: string | null) {
  if (typeof window === "undefined") return

  if (!token) {
    window.sessionStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
    return
  }

  window.sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token)
}

function mapBackendUser(user: AuthBackendUserResponse): AuthUser {
  return {
    userId: user.user_id,
    userName: user.user_name,
    email: user.email
  }
}

async function extractApiError(response: Response, fallbackMessage: string): Promise<string> {
  try {
    const data = await response.json()

    if (typeof data?.detail === "string") {
      return data.detail
    }

    if (Array.isArray(data?.detail) && typeof data.detail[0]?.msg === "string") {
      return data.detail[0].msg
    }
  } catch {
    return fallbackMessage
  }

  return fallbackMessage
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<AuthUser | null>(null)
  const accessToken = ref<string | null>(readAccessToken())
  const isAuthModalOpen = ref(false)
  const modalMode = ref<AuthModalMode>("login")
  const preparedEmail = ref("")
  const isAuthPending = ref(false)
  const isInitialized = ref(false)
  const isInitializing = ref(false)

  const isAuthenticated = computed(() => user.value !== null)
  const userInitials = computed(() => {
    if (!user.value) return "?"

    const words = user.value.userName.trim().split(/\s+/).filter(Boolean)
    if (words.length === 0) return "?"
    if (words.length === 1) return (words[0] ?? "?").slice(0, 1).toUpperCase()

    const first = words[0] ?? ""
    const second = words[1] ?? ""
    return `${first[0] ?? ""}${second[0] ?? ""}`.toUpperCase() || "?"
  })

  function openLogin(prefilledEmail = preparedEmail.value) {
    modalMode.value = "login"
    preparedEmail.value = prefilledEmail
    isAuthModalOpen.value = true
  }

  function openRegister(prefilledEmail = preparedEmail.value) {
    modalMode.value = "register"
    preparedEmail.value = prefilledEmail
    isAuthModalOpen.value = true
  }

  function setModalMode(mode: AuthModalMode) {
    modalMode.value = mode
  }

  function closeAuthModal() {
    isAuthModalOpen.value = false
  }

  function setAccessToken(token: string | null) {
    accessToken.value = token
    writeAccessToken(token)
  }

  async function fetchCurrentUser(token = accessToken.value): Promise<AuthUser | null> {
    const headers: HeadersInit = {
      Accept: "application/json"
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(AUTH_ENDPOINTS.me, {
      method: "GET",
      credentials: "include",
      headers
    })

    if (!response.ok) {
      if (response.status === 401) return null
      throw new Error(await extractApiError(response, "Не удалось получить профиль пользователя"))
    }

    const payload = await response.json() as AuthBackendUserResponse
    return mapBackendUser(payload)
  }

  async function initializeAuth() {
    if (isInitialized.value || isInitializing.value) return

    isInitializing.value = true

    try {
      user.value = await fetchCurrentUser()
      preparedEmail.value = user.value?.email ?? preparedEmail.value

      if (!user.value) {
        setAccessToken(null)
      }
    } catch {
      user.value = null
      setAccessToken(null)
    } finally {
      isInitialized.value = true
      isInitializing.value = false
    }
  }

  async function login(values: AuthLoginFormValues) {
    isAuthPending.value = true

    const email = normalizeAuthEmail(values.email)
    preparedEmail.value = email

    let success = false

    try {
      const response = await fetch(AUTH_ENDPOINTS.login, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: buildLoginPayload({ email, password: values.password })
      })

      if (!response.ok) {
        throw new Error(await extractApiError(response, "Не удалось выполнить вход"))
      }

      const tokens = await response.json() as AuthBackendTokenResponse
      setAccessToken(tokens.access_token)

      const currentUser = await fetchCurrentUser(tokens.access_token)

      if (!currentUser) {
        throw new Error("Не удалось получить данные пользователя после входа")
      }

      user.value = currentUser
      closeAuthModal()
      success = true
    } finally {
      if (!success) setAccessToken(null)
      isAuthPending.value = false
    }
  }

  async function register(values: AuthRegisterFormValues) {
    isAuthPending.value = true

    const email = normalizeAuthEmail(values.email)
    preparedEmail.value = email

    try {
      const registerResponse = await fetch(AUTH_ENDPOINTS.register, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(buildRegisterPayload({
          userName: values.userName,
          email,
          password: values.password
        }))
      })

      if (!registerResponse.ok) {
        throw new Error(await extractApiError(registerResponse, "Не удалось зарегистрироваться"))
      }

      await login({ email, password: values.password })
    } finally {
      // catch убран — ошибки всплывают сами, finally гарантирует сброс флага
      isAuthPending.value = false
    }
  }

  async function logout() {
    isAuthPending.value = true

    try {
      await fetch(AUTH_ENDPOINTS.logout, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          ...(accessToken.value ? {Authorization: `Bearer ${accessToken.value}`} : {})
        }
      })
    } finally {
      user.value = null
      setAccessToken(null)
      isAuthPending.value = false
    }
  }

  return {
    user,
    isAuthModalOpen,
    modalMode,
    preparedEmail,
    isAuthenticated,
    userInitials,
    isAuthPending,
    isInitialized,
    initializeAuth,
    openLogin,
    openRegister,
    setModalMode,
    closeAuthModal,
    login,
    register,
    logout
  }
})
