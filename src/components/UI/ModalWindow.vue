<script setup lang="ts">
import {onMounted, onUnmounted} from "vue";

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(["update:modelValue"]);

const close = () => {
  emit("update:modelValue", false);
};

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape") close();
};

onMounted(() => window.addEventListener("keydown", handleEsc));
onUnmounted(() => window.removeEventListener("keydown", handleEsc));
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="props.modelValue" class="overlay" @click="close">
        <div class="modal" @click.stop>
          <slot/>
          <button class="close-btn" @click="close">×</button>
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
}

.modal {
  background: white;
  padding: 32px;
  border-radius: 16px;
  min-width: 300px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>