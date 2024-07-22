// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/main.css'; // Импортируйте стили

createApp(App)
  .use(router)
  .mount('#app');