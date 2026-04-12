<script setup lang="ts">
import {onMounted, ref} from "vue"
import BaseButton from "@/components/Base/BaseButton.vue"
import AuthModal from "@/components/Auth/AuthModal.vue"
import {useAuthStore} from "@/stores/auth"

const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

const navigationLinks = [
  {to: "/tracker", label: "Трекер"},
  {to: "/analytics", label: "Аналитика"}
]

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

async function handleLogout() {
  await authStore.logout()
  closeMobileMenu()
}

onMounted(() => {
  authStore.initializeAuth()
})
</script>

<template>
  <header class="header">
    <div class="header-bar">
      <RouterLink to="/" class="logo" aria-label="Finance Tracker" @click="closeMobileMenu">
        <img src="/logo.png" alt="Finance Tracker logo">
      </RouterLink>

      <nav class="header-nav" aria-label="Основная навигация">
        <RouterLink
            v-for="link in navigationLinks"
            :key="link.to"
            :to="link.to"
            class="nav-option"
            active-class="nav-option--active"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="header-actions">
        <template v-if="authStore.isAuthenticated">
          <div class="auth-badge auth-badge--active">
            <span class="auth-avatar auth-avatar--active">
              {{ authStore.userInitials }}
            </span>
            <div class="auth-meta">
              <span class="auth-status">Авторизован</span>
              <span class="auth-email">{{ authStore.user?.email }}</span>
            </div>
          </div>

          <BaseButton variant="secondary" class="auth-action auth-action--desktop" @click="handleLogout">
            Выйти
          </BaseButton>
        </template>

        <template v-else>
          <BaseButton variant="secondary" class="auth-action auth-action--desktop" @click="authStore.openLogin()">
            Войти
          </BaseButton>
        </template>

        <button
            class="mobile-menu-button"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Открыть меню"
            @click="toggleMobileMenu"
        >
          <span/>
          <span/>
          <span/>
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <nav class="mobile-nav" aria-label="Мобильная навигация">
          <RouterLink
              v-for="link in navigationLinks"
              :key="link.to"
              :to="link.to"
              class="mobile-nav-option"
              active-class="mobile-nav-option--active"
              @click="closeMobileMenu"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <div class="mobile-auth-actions">
          <BaseButton
              v-if="authStore.isAuthenticated"
              variant="secondary"
              full-width
              @click="handleLogout"
          >
            Выйти
          </BaseButton>

          <BaseButton
              v-else
              variant="secondary"
              full-width
              @click="authStore.openLogin(); closeMobileMenu()"
          >
            Войти
          </BaseButton>
        </div>
      </div>
    </Transition>

    <AuthModal/>
  </header>
</template>

<style scoped>
.header {
  background-color: #fff;
  padding: 14px 0 18px;
  position: relative;
}

.header-bar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
}

.logo {
  display: inline-flex;
  align-items: center;
}

.logo img {
  width: 148px;
  height: auto;
  display: block;
}

.header-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;
  min-width: 0;
}

.nav-option {
  position: relative;
  font-weight: 600;
  color: #313131;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-option:hover,
.nav-option--active {
  color: #2A7956;
}

.nav-option--active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background: #2A7956;
}

.header-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

.auth-action {
  white-space: nowrap;
}

.auth-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 16px;
  background: #f5f7f6;
  border: 1px solid rgba(42, 121, 86, 0.12);
}

.auth-badge--active {
  background: linear-gradient(135deg, rgba(42, 121, 86, 0.12), rgba(42, 121, 86, 0.04));
}

.auth-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 700;
}

.auth-avatar--active {
  background: #2A7956;
  color: #ffffff;
}

.auth-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.auth-status {
  font-size: 12px;
  color: #2A7956;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.auth-email {
  max-width: 180px;
  color: #1f2937;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-menu-button {
  display: none;
  width: 46px;
  height: 46px;
  padding: 0;
  border: 2px solid #2A7956;
  border-radius: 50%;
  background: #ffffff;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}

.mobile-menu-button span {
  width: 18px;
  height: 2px;
  background: #2A7956;
  border-radius: 999px;
}

.mobile-menu {
  display: none;
}

@media (max-width: 767px) {
  .header-bar {
    grid-template-columns: auto 1fr;
    gap: 14px;
  }

  .header-nav {
    display: none;
  }

  .header-actions {
    justify-content: flex-end;
  }

  .auth-action--desktop {
    display: none;
  }

  .auth-badge {
    padding: 0;
    border: none;
    background: transparent;
  }

  .auth-meta {
    display: none;
  }

  .mobile-menu-button {
    display: inline-flex;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 14px;
    padding: 16px;
    border-radius: 18px;
    background: #f8faf9;
    border: 1px solid rgba(42, 121, 86, 0.12);
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .mobile-nav-option {
    padding: 12px 14px;
    border-radius: 12px;
    color: #1f2937;
    text-decoration: none;
    font-weight: 600;
    background: #ffffff;
  }

  .mobile-nav-option--active {
    color: #2A7956;
    box-shadow: inset 0 0 0 1px rgba(42, 121, 86, 0.3);
  }

  .mobile-auth-actions {
    display: flex;
    flex-direction: column;
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.18s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
