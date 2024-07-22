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
  },
  // Добавьте другие маршруты здесь
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
