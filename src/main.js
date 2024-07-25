// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueTelegram from 'vue-tg';
import { analytics } from './firebase';
import '@/assets/main.css';

const app = createApp(App);

app.config.globalProperties.$analytics = analytics;

app.use(VueTelegram);
app.use(router);

app.mount('#app');