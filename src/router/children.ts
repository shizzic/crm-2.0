const c = {
  home: () => import('@components/main/home/Main.vue'),
  profile: () => import('@components/main/profile/Main.vue'),
  settings: () => import('@components/main/settings/Main.vue')
}

export const children = [
  {
    path: '',
    name: 'home',
    component: c.home
  },
  {
    path: '/profile',
    name: 'profile',
    component: c.profile
  },
  {
    path: '/settings',
    name: 'settings',
    component: c.settings
  }
]
