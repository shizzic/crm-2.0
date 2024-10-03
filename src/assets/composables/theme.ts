import { useSettingsStore } from '@stores'

const id = '$$theme_component' // id style тега
export async function $setComponentStyle(component: string): Promise<void> {
  // ?inline в конце пути нужен, чтобы в будущем можно было спокойно использовать scss or less (внутри импортируемого файла)
  const css = await import(
    `@css/themes/${useSettingsStore().theme}/components/${component}/index.css?inline`
  )

  // добавляю тему
  const tag = document.createElement('style')
  tag.id = id
  tag.innerHTML = css.default
  document.head.appendChild(tag)
}

// удаляю style tag предыдущей темы, чтобы не наслаивать их друг на друга
export function $removeComponentStyle(): void {
  const oldTag = document.getElementById(id)
  oldTag?.remove()
}
