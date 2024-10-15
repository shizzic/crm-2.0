import { useSettingsStore } from '@stores'

const id = '$$palette' // id style тега хранящего палитру цветов
const c = '$$component' // id style тега хранящего все, кроме цветов (или статичные цвета)

export async function $setComponentStyle(componentName: string): Promise<void> {
  if (!isComponentStyleExist(componentName)) return

  const palette = await import(
    `@css/themes/${useSettingsStore().theme}/components/${componentName}/index.css?inline`
  )

  const componentCSS = await import(`@css/components/${componentName}/index.css?inline`)

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

// Проверяю существование папки в @css/components, чтобы не выскакивала ошибка при попытке импортировать несуществующии стили
function isComponentStyleExist(componentName: string): boolean {
  const existedComponents = import.meta.glob('@css/components/**')
  for (const path in existedComponents) {
    const shatteredPath = path.split('/')
    const existedName = shatteredPath[shatteredPath.length - 2]
    if (existedName === componentName) return true
  }
  return false
}
