import { createRouter, createWebHistory } from 'vue-router'
import { useSettingsStore, useUserStore } from '@stores'
import { children } from './children'
import { $removeComponentStyle } from '@composables/theme'

const c = {
  login: () => import('@components/login/Main.vue'),
  wrap: () => import('@/components/main/Wrap.vue')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: c.wrap,
      children: children
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
  $removeComponentStyle()

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
