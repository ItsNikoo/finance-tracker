<script setup lang="ts">
</script>

<template>
  <div class="container">
    <h2 class="title">Трекер в цифрах</h2>

    <div class="containers">
      <div class="advantage">
        <h3 class="number">1000+</h3>
        <p class="description">Транзакций обработано</p>
      </div>

      <div class="divider"></div>

      <div class="advantage">
        <h3 class="number">350+</h3>
        <p class="description">Активных пользователей</p>
      </div>

      <div class="divider"></div>

      <div class="advantage">
        <h3 class="number">-18%</h3>
        <p class="description">Среднее снижение лишних расходов</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-bottom: 40px;
  padding: 0 60px;
}

.title {
  color: #313131;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;
}

.containers {
  display: grid;
  grid-template-columns: 1fr 2px 1fr 2px 1fr;
  align-items: center;
  gap: 30px;
}

.divider {
  background-color: #2a7956;
  width: 2px;
  height: 80%;
  justify-self: center;
}

.advantage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  gap: 10px;
  text-align: center;
}

.number {
  color: #2a7956;
  font-size: 34px;
  font-weight: 700;
  margin: 0;
}

.description {
  font-family: "Inter", sans-serif;
  color: #313131;
  font-weight: 500;
  margin: 0;
}

/* ========================= */
/* 📱 Планшеты */
/* ========================= */

@media (max-width: 1024px) {
  .advantage{
    min-height: 100px;
  }

  .container {
    padding: 0 40px;
  }

  .title {
    font-size: 24px;
  }

  .number {
    font-size: 28px;
  }

  .containers {
    gap: 20px;
  }
}

/* ========================= */
/* 📱 Телефоны */
/* ========================= */

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  .title {
    font-size: 20px;
    margin-bottom: 30px;
  }

  .containers {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .divider {
    display: none;
  }

  .number {
    font-size: 26px;
  }
}
</style>