import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { Lang } from '@types'
import { useHttpStore } from '@stores'

export type Locale = 'RU' | 'EN'

export const locale: Ref<Locale> = ref('RU')
export const beforeLocaleSwitch: Ref<Locale | undefined> = ref(undefined)
export const languages: Ref<Lang> = ref({})
export const lang: ComputedRef<Lang> = computed(
  () => languages.value[beforeLocaleSwitch.value ?? locale.value]
)

// Получение всех переводов на выбранный язык (язык в headers)
export function getLang(): void {
  // if (!(locale.value in languages.value))
  fetch(useHttpStore().$endpoint + 'user/user/get-lang?file=web', {
    headers: useHttpStore().non_authorize_headers(),
    credentials: 'include'
  })
    .then((data) => {
      return data.json()
    })
    .then((r) => {
      if (!r?.data) return
      languages.value[locale.value] = r.data
      beforeLocaleSwitch.value = undefined
    })
}
