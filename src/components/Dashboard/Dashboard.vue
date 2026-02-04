<script setup lang="ts">
import FormComponent from "@/components/FormComponent.vue";
import type {EntityProps} from "@/types.ts";
import TotalIncome from "@/components/Dashboard/TotalIncome.vue";

const emit = defineEmits<{
  (e: "onSubmit", form: Omit<EntityProps, "id">): void
}>()

function handleSubmit(form: Omit<EntityProps, "id">): void {
  emit("onSubmit", form);
}
</script>

<template>
  <div class="dashboard-grid">
    <FormComponent @onSubmit="handleSubmit"/>
    <TotalIncome :amount="5000" :isIncome="true"/>
    <TotalIncome :amount="2000" :isIncome="false"/>
    <div class="grid-container">2</div>
    <div class="grid-container">3</div>
    <div class="grid-container">4</div>
  </div>
</template>

<style scoped>
.dashboard-grid {
  display: grid;
  //background-color: cornflowerblue;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
}

.grid-container {
  background-color: pink;
  margin: 20px;
  border-radius: 16px;

}
</style>
