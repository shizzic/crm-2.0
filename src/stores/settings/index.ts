import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { theme, getTheme } from './theme'
import { locale, languages, lang, getLang } from './lang'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const version = ref(1)
    const size = ref('0.85px') // font-size, padding, margin
    const month = ref(false)
    const linkTarget = ref('_self')

    watch(size, (value) => document.documentElement.style.setProperty('--html-size', value))

    return { version, locale, languages, lang, size, theme, month, linkTarget, getLang, getTheme }
  },
  {
    persist: [
      {
        storage: localStorage,
        pick: ['version', 'locale', 'size', 'theme', 'month']
      },
      {
        storage: sessionStorage,
        pick: ['languages']
      }
    ]
  }
)
