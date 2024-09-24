import { createRouter, createWebHistory } from 'vue-router'
import { useSettingsStore, useUserStore } from '@stores'

const c = {
  login: () => import('@components/login/Main.vue'),

  wrap: () => import('@/components/main/Wrap.vue'),
  home: () => import('@components/main/home/Main.vue'),
  settings: () => import('@components/main/settings/Main.vue')
}

const main_children = [
  {
    path: '',
    name: 'home',
    component: c.home
  },
  {
    path: '/settings',
    name: 'settings',
    component: c.settings
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

// меняю title вкладок + блокирую переходы на страницы без доступа
router.beforeEach((to) => {
  if (!useUserStore().id && to.name !== 'login') return { name: 'login' }
  if (useUserStore().id && to.name === 'login') return { name: 'home' }

  document.title =
    String(
      useSettingsStore().lang?.components?.[String(to.name)] ??
        window.location.hostname.split('.').shift()
    ) + ' | isinda'
  return true
})

export default router
