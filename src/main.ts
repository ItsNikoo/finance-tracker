import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/900.css'
import {createPinia} from "pinia";
import VueApexCharts from "vue3-apexcharts";
import {router} from "@/lib/router.ts";

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(VueApexCharts)
app.use(router)
app.mount('#app')
