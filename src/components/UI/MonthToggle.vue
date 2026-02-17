<script setup lang="ts">
import {ref, watch} from 'vue'
import {months} from '@/lib/months.ts'
import {useTransactionsStore} from "@/stores/transactions.ts";

const store = useTransactionsStore()
const selected = ref<number | "all">(getCurrentMonth())

watch(selected,
    () => store.selectedMonth = selected.value,
    {immediate: true})

function getCurrentMonth() {
  const date = new Date();
  const month = date.getMonth() + 1;
  return month
}

function select(value: number | "all") {
  store.setSelectedMonth(value);
  selected.value = value;
}
</script>

<template>
  <div class="month-toggle">
    <button
        v-for="m in months"
        :key="m.key"
        class="month-btn"
        :class="{ active: selected === m.key }"
        @click="select(m.key)"
    >
      {{ m.title }}
    </button>

    <button
        class="month-btn all"
        :class="{ active: selected === 'all' }"
        @click="select('all')"
    >
      Все
    </button>
  </div>
  <select
      class="month-select"
      :value="selected"
      @change="select(($event.target as HTMLSelectElement).value === 'all' ? 'all' : Number(($event.target as HTMLSelectElement).value))">
    <option
        v-for="m in months"
        :key="m.key"
        :value="m.key"
        :selected="selected === m.key"
        class="month-option"
    >
      {{ m.title }}
    </option>
    <option value="all" :selected="selected === 'all'">Все</option>
  </select>
</template>

<style scoped>
.month-toggle {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  padding: 12px 0;
  justify-content: center;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.month-btn {
  padding: 8px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.18s ease;
  white-space: nowrap;
  border-radius: 5px;
}

.month-btn:hover {
  background-color: #d9d9d9;
}

.month-btn.active {
  background-color: #2A7956;
  color: white;
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.month-btn.all {
  background-color: #6b7280;
  color: white;
  border-color: #6b7280;
}

.month-btn.all.active {
  background-color: #4b5563;
  border-color: #4b5563;
}

.month-select {
  display: none;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  margin: 12px 0;
  cursor: pointer;
}

.month-select:hover {
  border-color: #2A7956;
}

.month-select:focus {
  outline: none;
  border: 2px solid #2A7956;
}


/* ──────────────────────────────────────────────
   Адаптивность
─────────────────────────────────────────────── */

@media (max-width: 768px) {
  .month-toggle {
    justify-content: flex-start;
    padding: 12px 4px;
    gap: 6px 10px;
    display: none;
  }

  .month-select{
    display: flex;
  }

  .month-btn {
    padding: 7px 14px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .month-toggle {
    gap: 6px 8px;
  }

  .month-btn {
    padding: 6px 12px;
    font-size: 0.85rem;
  }
}
</style>