<script setup lang="ts">
import {ref} from "vue"
import BaseButton from "@/components/Base/BaseButton.vue"
import BaseInput from "@/components/Base/BaseInput.vue"
import {useAuthStore} from "@/stores/auth"
import {normalizeAuthEmail} from "@/lib/authContract"

const authStore = useAuthStore()

const form = ref({
  email: authStore.preparedEmail,
  password: ""
})

const error = ref<string | null>(null)

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function handleSubmit() {
  const email = normalizeAuthEmail(form.value.email)

  if (!email || !isValidEmail(email)) {
    error.value = "Введите корректный email"
    return
  }

  if (!form.value.password.trim()) {
    error.value = "Введите пароль"
    return
  }

  try {
    error.value = null

    await authStore.login({
      email,
      password: form.value.password
    })

    form.value.password = ""
  } catch (submitError) {
    error.value = submitError instanceof Error
      ? submitError.message
      : "Не удалось выполнить вход"
  }
}
</script>

<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <BaseInput
        v-model="form.email"
        type="email"
        placeholder="Email"
        :error="Boolean(error)"
        dark-placeholder
        autocomplete="email"
    />

    <BaseInput
        v-model="form.password"
        type="password"
        placeholder="Пароль"
        :error="Boolean(error)"
        dark-placeholder
        autocomplete="current-password"
    />

    <p v-if="error" class="auth-error">{{ error }}</p>

    <BaseButton type="submit" full-width>
      {{ authStore.isAuthPending ? "Входим..." : "Войти" }}
    </BaseButton>
  </form>
</template>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.auth-error {
  font-size: 13px;
  color: #d9534f;
}
</style>
