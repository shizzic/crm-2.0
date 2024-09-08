import { defineStore } from 'pinia'
import { set } from '@stores/reusable/funcs'
import { useHttpStore } from '@stores'
import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import type { Lang } from '@types'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const version: Ref<number> = ref(1)
    const locale: Ref<string> = ref('RU')
    const languages: Ref<Lang> = ref({})

    // Получение всех переводов на выбранный язык
    function get_lang(): void {
      if (!(locale.value in languages.value))
        fetch(inject('$endpoint') + 'user/user/get-lang?file=web', {
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

    return { version, locale, languages, set, get_lang }
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
