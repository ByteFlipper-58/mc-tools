import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import StrongholdFinder from '@/views/StrongholdFinder.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/stronghold-finder',
    name: 'StrongholdFinder',
    component: StrongholdFinder,
  }
];

const router = createRouter({
  history: createWebHistory('/mc-tools/'), // Убедитесь, что путь соответствует базовому пути
  routes,
});

export default router;