<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer-container">

      <div class="footer-top">
        <div class="brand">
          <h3 class="logo">FinanceTracker</h3>
          <p class="tagline">
            Контроль расходов. Понятная аналитика. Финансовая осознанность.
          </p>
        </div>

        <div class="links">
          <div class="column">
            <h4>Навигация</h4>
            <RouterLink to="/">Главная</RouterLink>
            <RouterLink to="/tracker">Трекер</RouterLink>
            <RouterLink to="/analytics">Аналитика</RouterLink>
          </div>

          <div class="column">
            <h4>Дополнительно</h4>
            <a href="#">О проекте</a>
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Поддержка</a>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="footer-bottom">
        <p>© {{ currentYear }} FinanceTracker. Все права защищены.</p>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #2a7956 0%, #256b4d 100%);
  color: white;
  margin-top: 80px;
}

.footer-container {
  padding: 60px 60px 30px 60px;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  gap: 60px;
  flex-wrap: wrap;
}

.logo {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}

.tagline {
  margin-top: 15px;
  max-width: 320px;
  font-size: 14px;
  opacity: 0.9;
}

.links {
  display: flex;
  gap: 60px;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.column h4 {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 600;
}

.column a,
.column :deep(a) {
  color: white;
  text-decoration: none;
  font-size: 14px;
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.column a:hover,
.column :deep(a:hover) {
  opacity: 1;
}

.divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 40px 0 20px 0;
}

.footer-bottom {
  text-align: center;
  font-size: 13px;
  opacity: 0.8;
}

/* ========================= */
/* 📱 Планшеты */
/* ========================= */

@media (max-width: 1024px) {
  .footer-container {
    padding: 50px 40px 30px 40px;
  }

  .links {
    gap: 40px;
  }
}

/* ========================= */
/* 📱 Телефоны */
/* ========================= */

@media (max-width: 768px) {
  .footer-container {
    padding: 40px 20px 20px 20px;
  }

  .footer-top {
    flex-direction: column;
    gap: 40px;
  }

  .links {
    flex-direction: column;
    gap: 30px;
  }

  .footer-bottom {
    font-size: 12px;
  }
}
</style>