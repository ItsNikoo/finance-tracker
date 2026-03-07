<script setup lang="ts">
</script>

<template>
  <div class="header">
    <RouterLink to="/" class="logo">
      <img src="/Logo.jpg" alt="Logo">
    </RouterLink>

    <ul class="header-nav">
      <RouterLink class="nav-option" to="/tracker">Трекер</RouterLink>
      <RouterLink class="nav-option" to="/analytics">Аналитика</RouterLink>
    </ul>

    <div class="right-space"></div>
  </div>
</template>

<style scoped>
.header {
  background-color: #fff;
  padding: 10px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo,
.right-space {
  width: 180px;
}

.header-nav {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 40px;
}

.nav-option {
  font-weight: 500;
  color: #313131;
  cursor: pointer;
  text-decoration: none;
}

.nav-option:hover {
  transition: 0.5s;
  color: #2A7956;
}

@media (max-width: 850px) {
  .header {
    flex-direction: column;
    align-items: center;
    gap: 10px; /* расстояние между лого и меню */
  }

  .logo {
    width: auto; /* убираем 180px */
  }

  .header-nav {
    justify-content: center;
    gap: 20px;
  }

  .right-space {
    display: none; /* полностью убираем */
  }
}

</style>
