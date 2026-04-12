<script setup lang="ts">
import {ref} from "vue"
import BaseButton from "@/components/Base/BaseButton.vue"
import BaseInput from "@/components/Base/BaseInput.vue"
import {useAuthStore} from "@/stores/auth"
import {normalizeAuthEmail} from "@/lib/authContract"

const authStore = useAuthStore()

const form = ref({
  userName: "",
  email: authStore.preparedEmail,
  password: ""
})

const error = ref<string | null>(null)

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function handleSubmit() {
  const userName = form.value.userName.trim()
  const email = normalizeAuthEmail(form.value.email)

  if (userName.length < 2) {
    error.value = "Имя пользователя должно содержать минимум 2 символа"
    return
  }

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

    await authStore.register({
      userName,
      email,
      password: form.value.password
    })

    form.value.password = ""
  } catch (submitError) {
    error.value = submitError instanceof Error
      ? submitError.message
      : "Не удалось зарегистрироваться"
  }
}
</script>

<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <BaseInput
        v-model="form.userName"
        type="text"
        placeholder="Username"
        :error="Boolean(error)"
        dark-placeholder
        autocomplete="username"
    />

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
        autocomplete="new-password"
    />

    <p v-if="error" class="auth-error">{{ error }}</p>

    <BaseButton type="submit" full-width>
      {{ authStore.isAuthPending ? "Регистрируем..." : "Зарегистрироваться" }}
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
