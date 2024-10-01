import { defineStore } from 'pinia'
import { useHttpStore } from '@stores'
import { ref, computed, watch } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { Lang } from '@types'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const $endpoint = useHttpStore().$endpoint
    const version: Ref<number> = ref(1)
    const size: Ref<string> = ref('1px') // font-size, padding, margin
    const theme: Ref<string> = ref('light') // font-size, padding, margin
    const locale: Ref<string> = ref('RU')
    const languages: Ref<Lang> = ref({})
    const lang: ComputedRef<Lang> = computed(() => languages.value[locale.value])

    watch(locale, () => getLang())
    watch(size, (value) => document.documentElement.style.setProperty('--html-size', value))
    watch(theme, getTheme)

    // Получение всех переводов на выбранный язык (язык в headers)
    function getLang(): void {
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

    async function getTheme(value: string): Promise<void> {
      const id = '$$theme' // id style тега

      // меняю иконки
      const links = document.head.getElementsByTagName('link')
      for (const tag of links)
        if (tag.rel === 'icon')
          tag.href = `/${value === 'light' || value === 'dark' ? value : 'light'}.ico`

      // удаляю style tag предыдущей темы, чтобы не наслаивать их друг на друга
      const oldTag = document.getElementById(id)
      oldTag?.remove()

      // динамически получаю тему
      // ?inline в конце пути нужен, чтобы в будущем можно было спокойно использовать scss or less (внутри импортируемого файла)
      const css = await import(`@assets/css/themes/${value}/index.css?inline`)

      // добавляю тему
      const tag = document.createElement('style')
      tag.id = id
      tag.innerHTML = css.default
      document.head.appendChild(tag)
    }

    return { version, locale, languages, lang, size, theme, getLang, getTheme }
  },
  {
    persist: [
      {
        storage: localStorage,
        pick: ['version', 'locale', 'size', 'theme']
      },
      {
        storage: sessionStorage,
        pick: ['languages']
      }
    ]
  }
)
