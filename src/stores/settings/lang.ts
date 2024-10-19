import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { Lang } from '@types'
import { fetcher } from '@composables/fetcher'

export type Locale = 'RU' | 'EN'

export const locale: Ref<Locale> = ref('RU')
export const beforeLocaleSwitch: Ref<Locale | undefined> = ref(undefined)
export const languages: Ref<Lang> = ref({})
export const lang: ComputedRef<Lang> = computed(
  () => languages.value[beforeLocaleSwitch.value ?? locale.value]
)

// Получение всех переводов на выбранный язык (язык в headers)
export async function getLang(): Promise<void> {
  // if (!(locale.value in languages.value))
  const r = await fetcher.unauthorized.get('user/user/get-lang?file=web')
  if (!r?.data) return
  languages.value[locale.value] = r.data
  beforeLocaleSwitch.value = undefined
}
