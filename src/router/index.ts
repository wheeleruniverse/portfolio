import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/planet/:id',
      name: 'planet',
      component: () => import('@/views/PlanetViews/PlanetView.vue'),
      props: true
    }
  ]
})

export default router