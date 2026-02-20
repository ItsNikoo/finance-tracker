import Tracker from "@/components/pages/Tracker.vue";
import Analytics from "@/components/pages/Analytics.vue";
import Main from "@/components/pages/Main.vue";
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