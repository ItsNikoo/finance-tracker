import {defineStore} from "pinia";
import {ref} from "vue";
import type {Limit} from "@/types.ts";
import {generateLimits} from "@/lib/limitGenerator.ts";

export const useLimitsStore = defineStore("limits", () => {
  const LIMITS_KEY = "limits"
  const limits = ref<Limit[]>([])


  function loadLimitsFromLocalStorage() {
    const data = localStorage.getItem(LIMITS_KEY)

    if (data) {
      try {
        limits.value = JSON.parse(data) as Limit[]
        return
      } catch (err) {
        console.warn("проблема с бюджетами", err);
        localStorage.removeItem(LIMITS_KEY);
      }
    }

    const limitsGenerated = localStorage.getItem("mock_limits_generated");

    if (limitsGenerated === "true") {
      console.log("Моковые данные уже были сгенерированы ранее → пропускаем");
      limits.value = [];
      return;
    }

    console.log("Генерируем mock-бюджеты впервые...");
    generateLimits()
    localStorage.setItem("mock_limits_generated", "true")
  }

  loadLimitsFromLocalStorage()

  return{
    limits
  }
})