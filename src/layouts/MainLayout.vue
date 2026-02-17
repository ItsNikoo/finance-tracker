<script setup lang="ts">

import Header from "@/components/Header.vue";
</script>

<template>
<div class="layout">
  <Header />
  <main>
    <slot />
  </main>
</div>
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
