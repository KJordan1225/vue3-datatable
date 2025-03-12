import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import CommitteeDashboardView from '../views/CommitteeDashboardView.vue'
import BrothersDashboardView from '../views/BrothersDashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/admin-dashboard',
      name: 'Admin Dashboard',
      component: AdminDashboardView,
    },
    {
      path: '/committee-dashboard',
      name: 'Committee Dashboard',
      component: CommitteeDashboardView,
    },
    {
      path: '/brothers-dashboard',
      name: 'Brothers Dashboard',
      component: BrothersDashboardView,
    },
  ],
})

export default router
