import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import './assets/input.css';
import 'element-plus/dist/index.css'
import { provideCartService } from './services/cart.service';
import { provideApplicationFrameworkService } from './services/application_framework.service';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.provide('cartService', provideCartService());
app.provide('applicationFrameworkService', provideApplicationFrameworkService());
app.mount('#app')
