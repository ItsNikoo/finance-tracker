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
.container{
  margin-bottom: 40px;
}
.title {
  color: #313131;
  text-align: center;
  font-size: 28px;
  margin-bottom: 40px;
}

.containers {
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr;
  gap: 11px;
  align-items: center;
}

.divider {
  background-color: #2a7956;
  height: 75%;
  width: 2px;
}

.advantage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  gap: 10px;
}

.number {
  color: #2a7956;
  font-size: 34px;
}

.description {
  font-family: "Inter", sans-serif;
  color: #313131;
  font-weight: 500;
}
</style>