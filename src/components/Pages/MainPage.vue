<script setup lang="ts">

import HeroComponent from "@/components/MainPage/HeroComponent.vue"
import NumbersComponent from "@/components/MainPage/NumbersComponent.vue"
import AdvantagesComponent from "@/components/MainPage/AdvantagesComponent.vue"
import CtaComponent from "@/components/MainPage/CTAComponent.vue"


</script>

<template>
  <div class="container">
    <HeroComponent/>
    <NumbersComponent/>
    <AdvantagesComponent/>
    <CtaComponent/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>