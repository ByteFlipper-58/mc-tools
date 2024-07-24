// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import NewScreen from '@/views/NewScreen.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/new',
    name: 'NewScreen',
    component: NewScreen,
  }
];

const router = createRouter({
  history: createWebHistory('/mc-tools/'), // Убедитесь, что указано правильное имя репозитория
  routes,
});

export default router;
