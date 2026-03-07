import TrackerPage from "@/components/Pages/TrackerPage.vue"
import AnalyticsPage from "@/components/Pages/AnalyticsPage.vue"
import MainPage from "@/components/Pages/MainPage.vue"
import {createRouter, createWebHistory} from "vue-router"

const routes = [
  {path: "/", component: MainPage},
  {path: "/tracker", component: TrackerPage},
  {path: "/analytics", component: AnalyticsPage}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior() {
    return {top: 0}
  }
})