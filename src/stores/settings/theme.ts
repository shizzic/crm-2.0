import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export const theme: Ref<string> = ref('light') // light/dark
watch(theme, getTheme)

export async function getTheme(value: string): Promise<void> {
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
