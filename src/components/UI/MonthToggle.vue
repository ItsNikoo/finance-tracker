<script setup lang="ts">
import {computed} from "vue"
import BaseSelect from "@/components/Base/BaseSelect.vue"
import {months} from "@/lib/months.ts"
import {useTransactionsStore} from "@/stores/transactions.ts"

const store = useTransactionsStore()

const monthOptions = computed(() => [
  {label: "Все периоды", value: "all" as const},
  ...months.map(month => ({label: month.title, value: month.key as number}))
])

function handleChange(value: number | "all" | undefined) {
  if (value === undefined) return
  store.setSelectedMonth(value)
}
</script>

<template>
  <div class="month-filter">
    <div class="month-copy">
      <span class="month-label">Период</span>
      <p class="month-description">Выберите месяц для просмотра аналитики и списка операций</p>
    </div>

    <div class="month-control">
      <BaseSelect
          :model-value="store.selectedMonth"
          @update:model-value="handleChange"
      >
        <option
            v-for="option in monthOptions"
            :key="option.value"
            :value="option.value"
        >
          {{ option.label }}
        </option>
      </BaseSelect>
    </div>
  </div>
</template>

<style scoped>
.month-filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px 18px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(42, 121, 86, 0.08), rgba(42, 121, 86, 0.03));
  border: 1px solid rgba(42, 121, 86, 0.12);
}

.month-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.month-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #2A7956;
}

.month-description {
  color: #4b5563;
  font-size: 14px;
}

.month-control {
  width: min(100%, 240px);
  flex-shrink: 0;
}

@media (max-width: 700px) {
  .month-filter {
    flex-direction: column;
    align-items: stretch;
  }

  .month-control {
    width: 100%;
  }
}
</style>
