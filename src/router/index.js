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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;