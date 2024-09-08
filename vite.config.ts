import { fileURLToPath } from 'node:url'
import * as path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  server: {
    port: 8080
  },
  define: {
    __VUE_OPTIONS_API__: false
  },
  resolve: {
    // alias: {
    //   // '@': path.resolve(__dirname, './src'),
    //   // '@stores': path.resolve(__dirname, './src/stores')

    //   '@': fileURLToPath(new URL('./src', import.meta.url)),
    //   '@stores': fileURLToPath(new URL('./src/stores', import.meta.url))
    // }
    alias: {
      '@': '/src',
      '@stores': '/src/stores'
    }
  }
})
