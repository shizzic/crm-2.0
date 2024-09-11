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

createApp(App).use(pinia).use(router).mount('#app')
