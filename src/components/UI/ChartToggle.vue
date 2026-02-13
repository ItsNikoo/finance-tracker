<script setup lang="ts">
defineProps({
  modelValue: { type: Boolean, default: false },
  disabled:  { type: Boolean, default: false },
  size:      { type: String, default: 'md' }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="toggle-switch">
    <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        :disabled="disabled"
    />
    <span class="slider"></span>
  </label>
</template>


<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: v-bind(size === 'sm' ? '38px' : size === 'lg' ? '56px' : '44px');
  height: v-bind(size === 'sm' ? '20px' : size === 'lg' ? '28px' : '24px');
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
  height: v-bind(size === 'sm' ? '16px' : size === 'lg' ? '24px' : '20px');
  width: v-bind(size === 'sm' ? '16px' : size === 'lg' ? '24px' : '20px');
  left: 2px;
  bottom: 2px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

input:checked + .slider {
  background: #2A7956;           /* indigo-500 вкл */
}

input:checked + .slider::before {
  transform: translateX(
      v-bind(size === 'sm' ? '18px' : size === 'lg' ? '28px' : '20px')
);
}

input:disabled + .slider {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>