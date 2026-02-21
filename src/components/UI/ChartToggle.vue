<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// Вычисляем размеры в зависимости от пропса size
const switchWidth = computed(() => {
  if (props.size === 'sm') return '38px'
  if (props.size === 'lg') return '56px'
  return '44px' // md по умолчанию
})

const switchHeight = computed(() => {
  if (props.size === 'sm') return '20px'
  if (props.size === 'lg') return '28px'
  return '24px'
})

const knobSize = computed(() => {
  if (props.size === 'sm') return '16px'
  if (props.size === 'lg') return '24px'
  return '20px'
})

const translateDist = computed(() => {
  if (props.size === 'sm') return '18px'
  if (props.size === 'lg') return '28px'
  return '20px'
})

function onChange(e: Event) {
  const input = e.target as HTMLInputElement
  emit('update:modelValue', input.checked)
}
</script>

<template>
  <label class="toggle-switch">
    <input
        type="checkbox"
        :checked="modelValue"
        @change="onChange"
        :disabled="disabled"
    />
    <span class="slider"></span>
  </label>
</template>

<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: v-bind(switchWidth);
  height: v-bind(switchHeight);
  cursor: pointer;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background: #e2e8f0;           /* серый выкл */
  border-radius: 9999px;
  transition: background 0.25s ease;
}

.slider::before {
  content: "";
  position: absolute;
  height: v-bind(knobSize);
  width: v-bind(knobSize);
  left: 2px;
  bottom: 2px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

input:checked + .slider {
  background: #2A7956;           /* зелёный вкл */
}

input:checked + .slider::before {
  transform: translateX(v-bind(translateDist));
}

input:disabled + .slider {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>