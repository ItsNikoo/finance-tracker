<script setup lang="ts">
import BaseButton from "@/components/Base/BaseButton.vue"
</script>

<template>
  <div class="cta-wrapper">
    <div class="cta-container">
      <h3 class="cta-title">
        Опробуйте финансовый трекер уже сегодня!
      </h3>

      <p class="cta-subtitle">
        Начните контролировать расходы и видеть реальную картину ваших финансов
      </p>

      <div class="buttons">
        <RouterLink to="/tracker">
          <BaseButton size="md">Попробовать</BaseButton>
        </RouterLink>

        <RouterLink to="/analytics">
          <BaseButton variant="secondary" size="md">Аналитика</BaseButton>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cta-wrapper {
  padding: 0 60px;
  margin: 60px 0;
}

.cta-container {
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  color: #313131;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-shadow: 0 10px 30px rgba(240, 240, 240, 1);
}

.cta-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.cta-subtitle {
  font-size: 16px;
  font-weight: 400;
  opacity: 0.9;
  max-width: 500px;
  margin: 0;
}

.buttons {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}
/* ========================= */
/* 📱 Планшеты */
/* ========================= */

@media (max-width: 1024px) {
  .cta-wrapper {
    padding: 0 40px;
  }

  .cta-container {
    padding: 50px 30px;
  }

  .cta-title {
    font-size: 24px;
  }
}

/* ========================= */
/* 📱 Телефоны */
/* ========================= */

@media (max-width: 768px) {
  .cta-wrapper {
    padding: 0 20px;
  }

  .cta-container {
    padding: 40px 20px;
  }

  .cta-title {
    font-size: 20px;
  }

  .cta-subtitle {
    font-size: 14px;
  }
}
</style>