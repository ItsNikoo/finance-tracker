<script setup lang="ts">
import type {Limit} from "@/types.ts";
import {computed} from "vue";

const props = defineProps<{
  limit: Limit
  expences: number
  selectedMonth: number | 'all'
}>()

// 🔥 Эффективный лимит
const effectiveLimit = computed(() => {
  return props.selectedMonth === 'all'
      ? props.limit.limit * 12
      : props.limit.limit
})

const percent = computed(() => {
  if (effectiveLimit.value === 0) return 0
  return Math.min((props.expences / effectiveLimit.value) * 100, 100)
})

const remaining = computed(() => {
  return effectiveLimit.value - props.expences;
})

const progressColor = computed(() => {
  return percent.value < 60
      ? '#2a7956'
      : percent.value < 85
          ? '#f59e0b'
          : '#d9534f'
})
</script>

<template>
  <div class="limit-card">
    <div class="left">
      <h3 class="category-name">{{ props.limit.name }}</h3>

      <div class="progress-container">
        <div
            class="progress-bar"
            :style="{ width: `${percent}%`, backgroundColor: progressColor }"
        ></div>
      </div>
    </div>

    <div class="right">
      <div class="amount-wrapper">
        <span class="spent">{{ props.expences.toLocaleString('ru-RU') }}</span>
        <span class="slash"> / </span>
        <span class="limit">
          {{ effectiveLimit.toLocaleString('ru-RU') }} ₽
        </span>
      </div>

      <div class="remaining" :class="{ negative: remaining < 0 }">
        {{ remaining >= 0 ? 'Осталось' : 'Перерасход' }}
        {{ Math.abs(remaining).toLocaleString('ru-RU') }} ₽
      </div>
    </div>
  </div>
</template>

<style scoped>
.limit-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  min-height: 94px;
  border: 1px solid rgba(42, 121, 86, 0.2);
}

.left {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-name {
  font-size: 17px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 240px;
}

.progress-container {
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease, background-color 0.4s ease;
}

.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
  text-align: right;
}

.amount-wrapper {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-variant-numeric: tabular-nums;
}

.spent {
  font-size: 20px;
  font-weight: 700;
  color: #2f3338;
}

.slash {
  font-size: 16px;
  color: #9ca3af;
  font-weight: 400;
}

.limit {
  font-size: 18px;
  font-weight: 600;
  color: #4b5563;
}

.remaining {
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
}

.remaining.negative {
  color: #d9534f;
  font-weight: 600;
}
</style>