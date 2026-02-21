<script setup lang="ts">
import type {Limit} from "@/types.ts";
import {computed} from "vue";

const props = defineProps<{
  limit: Limit
  expences: number
}>()

const percent = computed(() => {
  if (props.limit.limit === 0) return 0
  return Math.min((props.expences / props.limit.limit) * 100, 100)
})
const remaining = computed(() => {
  return props.limit.limit - props.expences;
})

const progressColor = computed(() => {
  return percent.value < 60 ? '#2a7956' : percent.value < 85 ? '#f59e0b' : '#d9534f'
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
        <span class="limit">{{ props.limit.limit.toLocaleString('ru-RU') }} ₽</span>
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
  border-radius: 16px;
  padding: 16px 20px;
  min-height: 94px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.limit-card:hover {
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.1);
}

/* ──────────────────────────────────────── */

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

/* ──────────────────────────────────────── */

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

/* ========== АДАПТИВНОСТЬ ========== */

@media (max-width: 768px) {
  .limit-card {
    padding: 14px 16px;
    min-height: 84px;
  }

  .category-name {
    font-size: 16px;
    max-width: 200px;
  }

  .spent {
    font-size: 19px;
  }

  .limit {
    font-size: 17px;
  }
}

@media (max-width: 600px) {
  .limit-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
  }

  .right {
    align-items: flex-start;
    text-align: left;
    width: 100%;
  }

  .amount-wrapper {
    font-size: 18px;
  }

  .remaining {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .limit-card {
    padding: 12px 14px;
  }

  .category-name {
    font-size: 15px;
  }
}
</style>