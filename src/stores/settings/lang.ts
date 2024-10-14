import { ref, watch, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { Lang } from '@types'
import { useHttpStore } from '@stores'

export const locale: Ref<string> = ref('RU')
export const languages: Ref<Lang> = ref({})
export const lang: ComputedRef<Lang> = computed(() => languages.value[locale.value])

watch(locale, () => getLang())

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
    })
}
