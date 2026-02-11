<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import MainPage from "@/components/MainPage.vue";
import Dashboard from "@/components/Dashboard/Dashboard.vue";

</script>

<template>
  <header>
  </header>

  <MainLayout>
    <div class="container">
      <MainPage/>
      <Dashboard/>
    </div>
  </MainLayout>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}


</style>
