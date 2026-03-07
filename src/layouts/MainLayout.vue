<script setup lang="ts">

import HeaderComponent from "@/components/HeaderComponent.vue"
import FooterComponent from "@/layouts/FooterComponent.vue"
</script>

<template>
  <div class="layout">
    <HeaderComponent/>
    <main>
      <slot/>
    </main>
  </div>
  <FooterComponent/>
</template>

<style scoped>
.layout {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 50px;
}

@media (max-width: 600px) {
  .layout {
    padding: 0 25px;
  }
}
</style>
