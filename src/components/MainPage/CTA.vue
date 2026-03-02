<script setup lang="ts">
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
        <RouterLink class="cta-button primary" to="/tracker">
          Попробовать
        </RouterLink>

        <RouterLink class="cta-button secondary" to="/analytics">
          Аналитика
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

/* Кнопки */
.cta-button {
  padding: 14px 32px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
}

/* Основная кнопка */
.primary {
  background-color: #2a7956;
  color: white;
}

.primary:hover {
  box-shadow: rgba(30, 87, 61, 0.25) 0 0 30px;
  transition: 300ms;
}

/* Вторая кнопка */
.secondary {
  border: 2px solid #2a7956;
  color: #2a7956;
}

.secondary:hover {
  box-shadow: rgba(24, 87, 61, 0.25) 0 0 30px;
  transition: 300ms;
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

  .cta-button {
    font-size: 14px;
    padding: 10px 24px ;
    text-align: center;
  }
}
</style>