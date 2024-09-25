import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
    // vueDevTools()
  ],
  server: {
    port: 8080
  },
  define: {
    __VUE_OPTIONS_API__: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),

      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/assets/types', import.meta.url)),
      '@composables': fileURLToPath(new URL('./src/assets/composables', import.meta.url)),
      '@symbols': fileURLToPath(new URL('./src/assets/symbols', import.meta.url)),
      '@patterns': fileURLToPath(new URL('./src/assets/patterns', import.meta.url))
    }
  }
})
