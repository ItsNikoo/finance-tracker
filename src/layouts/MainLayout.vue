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
</style>
