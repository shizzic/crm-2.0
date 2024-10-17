import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { theme, getTheme } from './theme'
import { locale, beforeLocaleSwitch, languages, lang, getLang } from './lang'
import { saveUserSettings } from '@stores/settings/saving'
import { setTimeout } from 'worker-timers'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const version = ref(1)
    const size = ref('0.95px') // font-size, padding, margin
    const month: Ref<'number' | 'word'> = ref('word')
    const linkTarget: Ref<'_self' | '_blank'> = ref('_self')

    document.documentElement.style.setProperty('--html-size', size.value)
    watch(size, (value) => document.documentElement.style.setProperty('--html-size', value))

    return {
      version,
      locale,
      beforeLocaleSwitch,
      languages,
      lang,
      size,
      theme,
      month,
      linkTarget,
      getLang,
      getTheme
    }
  },
  {
    persist: [
      {
        storage: localStorage,
        pick: ['version', 'locale', 'size', 'theme', 'month', 'linkTarget'],
        afterHydrate: (data) => {
          setTimeout(() => {
            watch(
              () => data.store.$state,
              () => saveUserSettings(),
              { deep: true }
            )
          }, 500)

          watch(locale, (value, old) => {
            if (!(value in languages.value)) beforeLocaleSwitch.value = old
            getLang()
          })
        }
      },
      {
        storage: sessionStorage,
        pick: ['languages']
      }
    ]
  }
)
