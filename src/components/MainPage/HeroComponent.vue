<script setup lang="ts">

</script>

<template>
  <div class="main-page">
    <div class="container">
      <div class="left">
        <h1 class="title">Все финансы в одном месте.</h1>
        <p class="subtitle">Ваш персональный финансовый ассистент</p>
        <div class="cta">
          <p class="cta-paragraph">Попробуйте уже сейчас!</p>
          <RouterLink to="/tracker" class="cta-button">Начать бесплатно</RouterLink>
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

.cta-button {
  background-color: #2A7956;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}

.cta-button:active {
  background-color: #1E573D;
}

.cta-button:hover {
  box-shadow: rgba(30, 87, 61, 0.25) 0 0 30px;
  transition: 300ms;
}

.image {
  width: 60%;
}

@media (max-width: 1310px) {
  .main-page{
    margin-top: 100px;
  }

  .title {
    font-size: 50px;
  }

  .subtitle{
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
