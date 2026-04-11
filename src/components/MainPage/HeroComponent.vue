<script setup lang="ts">

import BaseButton from "@/components/Base/BaseButton.vue"
</script>

<template>
  <div class="main-page">
    <div class="container">
      <div class="left">
        <h1 class="title">Все финансы в одном месте.</h1>
        <p class="subtitle">Ваш персональный финансовый ассистент</p>
        <div class="cta">
          <p class="cta-paragraph">Попробуйте уже сейчас!</p>
          <RouterLink to="/tracker">
            <BaseButton variant="primary" size="md">Начать бесплатно</BaseButton>
          </RouterLink>
        </div>
      </div>
      <img class="image" src="/Graph.jpg" alt="График на главной">
    </div>
  </div>
</template>

<style scoped>
.main-page {
  margin-top: 120px;
  margin-bottom: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.title {
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  font-size: 58px;
  color: #313131;
  margin: 0;
}

.subtitle {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 75px;
  color: #313131;
}

.cta {
  display: flex;
  gap: 20px;
  color: #313131;
  align-items: center;
}


.image {
  width: 60%;
}

@media (max-width: 1310px) {
  .main-page {
    margin-top: 100px;
  }

  .title {
    font-size: 50px;
  }

  .subtitle {
    font-size: 18px;
  }

  .image {
    width: 50%;
  }
}

@media (max-width: 1000px) {
  .title {
    text-align: center;
    font-size: 40px;
  }

  .image {
    display: none;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}

@media (max-width: 650px) {
  .cta-paragraph {
    display: none;
  }
}
</style>
