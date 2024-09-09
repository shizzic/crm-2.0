import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { addResetMethod } from '@stores'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(addResetMethod)
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(pinia)
  .use(router)
  .provide('$endpoint', import.meta.env.VITE_API_ENDPOINT)
  .provide('$asset', (filename: string, media: string, endpoint: string | null = null) => {
    endpoint += !endpoint ? media + '/get-file?file=' : '/get-file?file='

    if (filename)
      if (filename.search('blob:') === -1)
        return filename.search('\\?') === -1
          ? '/images' + filename
          : import.meta.env.VITE_API_ENDPOINT + endpoint + filename.split('?').shift()
      else return filename
  })
  .mount('#app')
