import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useStore = defineStore('sidebar', () => {
  const min = Math.round(window.outerWidth * 0.2)
  const max = Math.round(window.outerWidth * 0.3)
  const minWidth: number = min < 375 ? 375 : min
  const maxWidth: number = max < 575 ? 575 : max
  const width = ref(minWidth + Math.trunc((maxWidth - minWidth) / 2))
  const cssWidth = ref(width.value)

  function expand(): void {
    const cssVarWidth = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width')
    )
    const result = cssVarWidth ? 0 : width.value
    cssWidth.value = result
  }

  watch(cssWidth, (value) => {
    if (value) width.value = value // изменяю ширину не скрытого сайдбара
    document.documentElement.style.setProperty('--sidebar-width', `${value}px`) // а вот фактическую ширину css меняю в любом случаи
  })

  document.documentElement.style.setProperty('--sidebar-width', `${width.value}px`)

  return { minWidth, maxWidth, cssWidth, width, expand }
})
