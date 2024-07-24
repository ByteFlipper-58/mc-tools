// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueTelegram from 'vue-tg'
import '@/assets/main.css';

createApp(App)
  .use(VueTelegram)
  .use(router)
  .mount('#app');