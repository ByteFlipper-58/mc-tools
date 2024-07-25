import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import StrongholdFinder from '@/views/StrongholdFinder.vue';
import ServerStatus from '@/views/ServerStatus.vue';

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
  },
  {
    path: '/server-status',
    name: 'ServerStatus',
    component: ServerStatus,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;