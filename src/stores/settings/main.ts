import { defineStore } from 'pinia'
import { set } from '@/stores/reusable/funcs'
import { useHttpStore } from '@/stores'
import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import type { Lang } from '@/assets/types'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const version: Ref<number, number> = ref(1)
    const locale: Ref<string, string> = ref('RU')

    // Получение всех переводов на выбранный язык
    function get_lang(languages: Lang): void {
      if (!(locale.value in languages.value))
        fetch(inject('$endpoint') + 'user/user/get-lang?file=web', {
          headers: useHttpStore().non_authorize_headers(),
          credentials: 'include'
        })
          .then((data) => {
            return data.json()
          })
          .then((data) => {
            languages.value[locale.value] = data.data
          })
    }

    return { version, locale, set, get_lang }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['version', 'locale']
    }
  }
)
