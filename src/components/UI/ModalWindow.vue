<script setup lang="ts">
import {onMounted, onUnmounted} from "vue"

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(["update:modelValue"])

const close = () => {
  emit("update:modelValue", false)
}

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape") close()
}

onMounted(() => window.addEventListener("keydown", handleEsc))
onUnmounted(() => window.removeEventListener("keydown", handleEsc))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="props.modelValue" class="overlay" @click="close">
        <div class="modal" @click.stop>
          <slot/>
          <button class="close-btn" aria-label="Закрыть" @click="close">×</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 16px;
  box-sizing: border-box;
}

.modal {
  background: white;
  padding: 32px;
  border-radius: 16px;
  min-width: 300px;
  max-width: min(100vw - 32px, 560px);
  position: relative;
  box-sizing: border-box;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 16px;
  background: none;
  border: none;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  color: #6b7280;
}
</style>
