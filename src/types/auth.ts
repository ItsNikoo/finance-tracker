export type AuthModalMode = "login" | "register"

export interface AuthUser {
  userId: number
  userName: string
  email: string
}

export interface AuthLoginFormValues {
  email: string
  password: string
}

export interface AuthRegisterFormValues {
  userName: string
  email: string
  password: string
}

export interface AuthBackendRegisterPayload {
  user_name: string
  email: string
  password: string
}

export interface AuthBackendTokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface AuthBackendUserResponse {
  user_id: number
  user_name: string
  email: string
}
