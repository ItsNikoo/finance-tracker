<script setup lang="ts">

import Hero from "@/components/MainPage/Hero.vue";
import Numbers from "@/components/MainPage/Numbers.vue";
import Advantages from "@/components/MainPage/Advantages.vue";
import CTA from "@/components/MainPage/CTA.vue";


</script>

<template>
  <div class="container">
    <Hero/>
    <Numbers/>
    <Advantages/>
    <CTA/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>