import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('component/settings', () => {
  const search = ref('')

  async function getTheme(value: string): Promise<void> {
    const id = '$$theme_component' // id style тега

    // удаляю style tag предыдущей темы, чтобы не наслаивать их друг на друга
    const oldTag = document.getElementById(id)
    oldTag?.remove()

    // динамически получаю тему
    // ?inline в конце пути нужен, чтобы в будущем можно было спокойно использовать scss or less (внутри импортируемого файла)
    const css = await import(`@css/themes/${value}/components/settings/index.css?inline`)

    // добавляю тему
    const tag = document.createElement('style')
    tag.id = id
    tag.innerHTML = css.default
    document.head.appendChild(tag)
  }

  return { search, getTheme }
})
