<script setup lang="ts" generic="T extends string | number | boolean">
import {ref} from 'vue'

const model = defineModel<T>()

const props = withDefaults(defineProps<{
  error?: boolean
}>(), {
  error: false
})

const isOpen = ref(false)
</script>

<template>
  <div class="base-select-wrapper">
    <select
        v-model="model"
        class="base-select"
        :class="{ 'base-select--error': props.error }"
        @focus="isOpen = true"
        @blur="isOpen = false"
    >
      <slot/>
    </select>

    <span class="base-select-arrow" :class="{ 'base-select-arrow--open': isOpen }"/>
  </div>
</template>

<style scoped>
.base-select-wrapper {
  position: relative;
  width: 100%;
}

.base-select {
  width: 100%;
  padding: 12px 36px 12px 12px;
  border-radius: 12px;
  border: 1px solid gainsboro;
  background: transparent;
  color: black;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.base-select:focus {
  border-color: transparent;
  box-shadow: 0 0 0 2px #2A7956;
}

.base-select--error {
  border-color: #ef4444;
}

.base-select--error:focus {
  box-shadow: 0 0 0 2px #ef4444;
}

.base-select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  width: 8px;
  height: 8px;
  border-right: 2px solid gainsboro;
  border-bottom: 2px solid gainsboro;
  transform: translateY(-75%) rotate(45deg); /* -75% вместо -50%, чтобы учесть поворот */
  pointer-events: none;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.base-select-arrow--open {
  transform: translateY(-25%) rotate(225deg); /* 45 + 180 */
}

.base-select-wrapper:hover .base-select-arrow,
.base-select-arrow--open {
  border-color: #2A7956;
}

/* ключевое изменение: зелёный текст опций */
.base-select option {
  background: #1f1f1f;
  color: #2A7956;
}
</style>