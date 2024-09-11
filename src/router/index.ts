import { createRouter, createWebHistory } from 'vue-router'

const c = {
  some: () => import('@components/Some.vue'),
  login: () => import('@components/login/Main.vue'),
  wrap: () => import('@/components/main/Wrap.vue'),
  home: () => import('@components/main/home/Main.vue')
}

const main_children = [
  {
    path: '',
    name: 'home',
    component: c.home
  },
  {
    path: '/some',
    name: 'some',
    component: c.some
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: c.wrap,
      children: main_children
    },
    {
      path: '/login',
      name: 'login',
      component: c.login
    }
  ]
})

export default router
