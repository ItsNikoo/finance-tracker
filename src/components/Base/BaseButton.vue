<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "icon"
  size?: "md" | "lg"
  fullWidth?: boolean
}>(), {
  type: "button",
  variant: "primary",
  size: "md",
  fullWidth: false
})
</script>

<template>
  <button
      :type="props.type"
      class="base-button"
      :class="[
        `base-button--${props.variant}`,
        `base-button--${props.size}`,
        { 'base-button--full-width': props.fullWidth }
      ]"
  >
    <slot/>
  </button>
</template>

<style scoped>
.base-button {
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-family: inherit;
  box-sizing: border-box; /* ВАЖНО */
}

/* full width */
.base-button--full-width {
  width: 100%;
}

/* sizes */
.base-button--md {
  padding: 10px 16px;
  font-size: 14px;
}

.base-button--lg {
  padding: 14px 20px; /* было 24 → стало аккуратнее */
  font-size: 16px;
  font-weight: 600;
}

/* variants */
.base-button--primary {
  background: #2A7956;
  color: #ffffff;
  border: 2px solid transparent; /* выравниваем с secondary */
}

.base-button--primary:hover {
  background-color: rgb(23 68 49);
}

.base-button--primary:active {
  background: #1E573D;
}

.base-button--secondary {
  background: #ffffff;
  color: #2A7956;
  border: 2px solid #2a7956;
}

.base-button--secondary:hover {
  background: #f3f4f6;
}

/* icon */
.base-button--icon {
  width: 32px;
  height: 32px;
  padding: 0;
  background: #ffffff;
  color: #313131;
  flex-shrink: 0;
  border: none;
}

.base-button--icon:hover {
  background: #d7d7d7;
}
</style>
