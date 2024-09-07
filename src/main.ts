import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import { Merge_provide } from '@/assets/symbols'

const pinia = createPinia()
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
  .provide(Merge_provide, function merge(obj1: any, obj2: any): any {
    const result = { ...obj1 }

    for (const key in obj2) {
      if (Object.prototype.hasOwnProperty.call(obj2, key)) {
        if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
          result[key] = merge(obj1[key], obj2[key])
        } else {
          result[key] = obj2[key]
        }
      }
    }

    return result
  })
  .mount('#app')
