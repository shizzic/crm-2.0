<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
const resizer = useTemplateRef('resizer')
const min = Math.round(window.outerWidth * 0.20)
const max = Math.round(window.outerWidth * 0.30)
const minWidth: number = min < 400 ? 400 : min
const maxWidth: number = max < 600 ? 600 : max
document.documentElement.style.setProperty('--sidebar-width', `${minWidth + (Math.trunc((maxWidth - minWidth) / 2))}px`)

onMounted(() => {
    // эти переменные изменяются только во время движения по зажатому resizer
    let x = 0
    let w = 0

    const mouseDownHandler = function (e: any) {
        updateSelectionState('none') // предотвращаю выборку текста и блоков во время изменения ширины
        x = e.clientX
        w = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width'))
        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)
    }

    const mouseMoveHandler = function (e: any) {
        const result = w + e.clientX - x

        if (result >= minWidth && result <= maxWidth)
            document.documentElement.style.setProperty('--sidebar-width', `${result}px`)
    }

    const mouseUpHandler = function () {
        document.removeEventListener('mousemove', mouseMoveHandler)
        document.removeEventListener('mouseup', mouseUpHandler)
        updateSelectionState('auto') // разрешаю выбор текста после отжатой кнопки мыши
    }

    resizer.value?.addEventListener('mousedown', mouseDownHandler)
})

const updateSelectionState = (value: string): void => {
    document.getElementsByTagName("html")[0].style.userSelect = value
}
</script>

<template>
    <div ref="resizer" />
</template>

<style scoped>
div {
    cursor: var(--resizer-cursor, ew-resize);
    width: 7px;
    height: 100%;

    position: absolute;
    top: 0;
    right: 0;
}
</style>