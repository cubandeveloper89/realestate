import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: () => import('../views/AboutView.vue') },
  { path: '/services', component: () => import('../views/ServicesView.vue') },
  { path: '/contact', component: () => import('../views/ContactView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
