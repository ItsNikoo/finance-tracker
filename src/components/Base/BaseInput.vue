<script setup lang="ts">
const model = defineModel<string | number>()

const props = withDefaults(defineProps<{
  type?: string
  placeholder?: string
  error?: boolean
  darkPlaceholder?: boolean
}>(), {
  type: "text",
  placeholder: "",
  error: false,
  darkPlaceholder: false
})
</script>

<template>
  <input
      v-model="model"
      :type="props.type"
      :placeholder="props.placeholder"
      class="base-input"
      :class="{
        'base-input--error': props.error,
        'base-input--dark-placeholder': props.darkPlaceholder
      }"
  />
</template>

<style scoped>
.base-input {
  width: 100%;
  padding: 12px 12px;
  border-radius: 12px;
  border: 1px solid gainsboro;
  background: transparent;
  color: gainsboro;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.base-input::placeholder {
  color: gainsboro;
}

.base-input--dark-placeholder {
  color: #1f1f1f;
}

.base-input--dark-placeholder::placeholder {
  color: #1f1f1f;
}

.base-input:focus {
  border-color: transparent;
  box-shadow: 0 0 0 2px #2A7956;
}

.base-input--error {
  border-color: #ef4444;
}

.base-input--error:focus {
  box-shadow: 0 0 0 2px #ef4444;
}
</style>