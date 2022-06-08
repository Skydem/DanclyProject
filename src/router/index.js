import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Dashboard from '@/views/DashboardView.vue';
import Onboarding from '@/views/OnboardingView.vue';
import About from '@/views/AboutView.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
  },
  {
    name: 'Onboarding',
    path: '/onboard',
    component: Onboarding,
  },
  {
    name: 'about',
    path: '/about',
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
