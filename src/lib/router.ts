import Tracker from "@/components/Pages/Tracker.vue";
import Analytics from "@/components/Pages/Analytics.vue";
import Main from "@/components/Pages/Main.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {path: "/", component: Main},
  {path: "/tracker", component: Tracker},
  {path: "/analytics", component: Analytics},
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})