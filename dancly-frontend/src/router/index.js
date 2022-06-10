import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Dashboard from '@/views/DashboardView.vue';
import Onboarding from '@/views/OnboardingView.vue';
import About from '@/views/AboutView.vue';
// import store from '@/store';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    afterEnter: (to, from, next) => {
      if (from === 'dashboard') {
        window.location.reload();
      }
      next();
    },
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: Dashboard,
    meta: {
      requireAuth: true,
    },
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

// router.beforeEach((to, from, next) => {
//   if (!to.matched.some((record) => record.meta.requireAuth)) {
//     next();
//     return;
//   }
//   if (store.state.userLoggedIn) {
//     next();
//   } else {
//     next({ name: 'home' });
//   }
// });

export default router;
