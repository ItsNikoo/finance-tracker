import type {
  AuthBackendRegisterPayload,
  AuthLoginFormValues,
  AuthRegisterFormValues
} from "@/types/auth"

const FALLBACK_API_BASE_URL = "http://127.0.0.1:8000/api/v1"

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || FALLBACK_API_BASE_URL).replace(/\/$/, "")
export const AUTH_ACCESS_TOKEN_STORAGE_KEY = "auth_access_token"

export const AUTH_ENDPOINTS = {
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  refresh: `${API_BASE_URL}/auth/refresh`,
  logout: `${API_BASE_URL}/auth/logout`,
  me: `${API_BASE_URL}/users/me`
} as const

export const FINANCE_ENDPOINTS = {
  categories: `${API_BASE_URL}/categories`,
  transactions: `${API_BASE_URL}/transactions`,
  limits: `${API_BASE_URL}/limits`
} as const

export function normalizeAuthEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function buildRegisterPayload(values: AuthRegisterFormValues): AuthBackendRegisterPayload {
  return {
    user_name: values.userName.trim(),
    email: normalizeAuthEmail(values.email),
    password: values.password
  }
}

export function buildLoginPayload(values: AuthLoginFormValues): URLSearchParams {
  const payload = new URLSearchParams()
  payload.set("username", normalizeAuthEmail(values.email))
  payload.set("password", values.password)
  return payload
}

export function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") return null
  return window.sessionStorage.getItem(AUTH_ACCESS_TOKEN_STORAGE_KEY)
}

export function buildAuthorizedHeaders(includeJson = true): HeadersInit {
  const headers: HeadersInit = {}
  const token = getStoredAccessToken()

  if (includeJson) {
    headers.Accept = "application/json"
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}
