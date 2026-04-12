<script setup lang="ts">
import {computed} from "vue"
import ModalWindow from "@/components/UI/ModalWindow.vue"
import BaseButton from "@/components/Base/BaseButton.vue"
import LoginForm from "@/components/Auth/LoginForm.vue"
import RegisterForm from "@/components/Auth/RegisterForm.vue"
import {useAuthStore} from "@/stores/auth"

const authStore = useAuthStore()

const currentComponent = computed(() =>
    authStore.modalMode === "login" ? LoginForm : RegisterForm
)
</script>

<template>
  <ModalWindow v-model="authStore.isAuthModalOpen">
    <div class="auth-modal">
      <div class="auth-copy">
        <p class="auth-eyebrow">Личный кабинет</p>
        <h2 class="auth-title">
          {{ authStore.modalMode === "login" ? "Вход в аккаунт" : "Регистрация" }}
        </h2>
      </div>

      <div class="auth-tabs">
        <BaseButton
            :variant="authStore.modalMode === 'login' ? 'primary' : 'secondary'"
            class="auth-tab"
            @click="authStore.setModalMode('login')"
        >
          Вход
        </BaseButton>
        <BaseButton
            :variant="authStore.modalMode === 'register' ? 'primary' : 'secondary'"
            class="auth-tab"
            @click="authStore.setModalMode('register')"
        >
          Регистрация
        </BaseButton>
      </div>

      <component :is="currentComponent"/>

    </div>
  </ModalWindow>
</template>

<style scoped>
.auth-modal {
  width: min(100vw - 64px, 440px);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.auth-copy {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.auth-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #2A7956;
}

.auth-title {
  margin: 0;
  color: #1f2937;
  font-size: 24px;
}


.auth-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.auth-tab {
  width: 100%;
}

@media (max-width: 600px) {
  .auth-modal {
    width: min(100vw - 40px, 440px);
  }
}
</style>
