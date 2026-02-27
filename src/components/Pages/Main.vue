<script setup lang="ts">

import Hero from "@/components/MainPage/Hero.vue";
import Dashboard from "@/components/Dashboard/Dashboard.vue";
import Numbers from "@/components/MainPage/Numbers.vue";
import Advantages from "@/components/MainPage/Advantages.vue";


</script>

<template>
  <div class="container">
    <Hero/>
    <Numbers/>
    <Advantages/>
    <Dashboard/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>