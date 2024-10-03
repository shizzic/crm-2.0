import { useSettingsStore } from '@stores'

const id = '$$palette' // id style тега хранящего палитру цветов
const c = '$$component' // id style тега хранящего все, кроме цветов (или статичные цвета)

export async function $setComponentStyle(component: string): Promise<void> {
  const palette = await import(
    `@css/themes/${useSettingsStore().theme}/components/${component}/index.css?inline`
  )

  const componentCSS = await import(`@css/components/${component}/index.css?inline`)

  const paletteTag = document.createElement('style')
  paletteTag.id = id
  paletteTag.innerHTML = palette.default
  document.head.appendChild(paletteTag)

  const componentTag = document.createElement('style')
  componentTag.id = c
  componentTag.innerHTML = componentCSS.default
  document.head.appendChild(componentTag)
}

// удаляю style tag предыдущей темы, чтобы не наслаивать их друг на друга
export function $removeComponentStyle(): void {
  const theme_component = document.getElementById(id)
  theme_component?.remove()
  const component = document.getElementById(c)
  component?.remove()
}
