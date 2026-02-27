<script setup lang="ts">
const advantages = [
  {
    title: "Полная картина расходов",
    description: "Все доходы и расходы в одном месте — без таблиц и блокнотов.",
  },
  {
    title: "Контроль бюджета",
    description: "Устанавливай лимиты по категориям и избегай перерасхода.",
  },
  {
    title: "Наглядная аналитика",
    description: "Интерактивные графики и отчёты помогают видеть, куда уходят деньги.",
  },
  {
    title: "Быстрое добавление операций",
    description: "Добавление транзакции занимает всего несколько секунд.",
  },
  {
    title: "Адаптивный интерфейс",
    description: "Работает одинаково удобно на телефоне и компьютере.",
  },
  {
    title: "Тёмная и светлая тема",
    description: "Выбирай режим, который комфортен для глаз.",
  },
]
</script>

<template>
  <div class="wrapper">
    <h2 class="title">Преимущества трекера</h2>
    <div class="grid">
      <div class="card" v-for="(item, index) in advantages" :key="index">
        <div class="accent-bar"></div>
        <div class="content">
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 40px 60px;
  margin-bottom: 40px;
}

.title {
  text-align: center;
  color: #313131;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px 40px;
}

.card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 14px;
}

.accent-bar {
  width: 6px;
  border-radius: 4px;
  background-color: #2a7956;
  flex-shrink: 0;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-title {
  color: #313131;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.card-description {
  color: #313131;
  font-size: 14px;
  font-weight: 400;
  font-family: "Inter", sans-serif;
  margin: 0;
  line-height: 1.5;
}
</style>