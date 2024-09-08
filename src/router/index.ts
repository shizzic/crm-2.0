import { createRouter, createWebHistory } from 'vue-router'

const c = {
  home: () => import('@components/home/Main.vue'),
  login: () => import('@components/user/login/Main.vue')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: c.home
    },
    {
      path: '/login',
      name: 'login',
      component: c.login
    }
  ]
})

export default router
