import { defineStore } from 'pinia'
import { set } from '@stores/reusable/funcs'
import { useHttpStore } from '@stores'
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { Lang } from '@types'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const $endpoint = useHttpStore().$endpoint
    const version: Ref<number> = ref(1)
    const locale: Ref<string> = ref('RU')
    const languages: Ref<Lang> = ref({})
    const lang: ComputedRef<Lang> = computed(() => languages.value[locale.value])

    // Получение всех переводов на выбранный язык
    function get_lang(): void {
      // if (!(locale.value in languages.value))
      fetch($endpoint + 'user/user/get-lang?file=web', {
        headers: useHttpStore().non_authorize_headers(),
        credentials: 'include'
      })
        .then((data) => {
          return data.json()
        })
        .then((r) => {
          if (!r?.data) return
          languages.value[locale.value] = r.data
        })
    }

    return { version, locale, languages, lang, set, get_lang }
  },
  {
    persist: [
      {
        storage: localStorage,
        pick: ['version', 'locale']
      },
      {
        storage: sessionStorage,
        pick: ['languages']
      }
    ]
  }
)
