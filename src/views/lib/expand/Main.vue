<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsStore } from '@stores'
import { $img } from '@assets/composables'
import Poppers from '@views/lib/popper/Main.vue'
import Image from '@views/lib/image/Main.vue'

const lang = useSettingsStore().lang
const oldWidth = ref(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width')))
const sidebarWidth = ref(oldWidth.value)
const expandHandler = (): void => {
    sidebarWidth.value = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width'))
    if (sidebarWidth.value) oldWidth.value = sidebarWidth.value
    document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidth.value ? 0 : oldWidth.value}px`)
    document.documentElement.style.setProperty('--resizer-cursor', `${sidebarWidth.value ? 'default' : 'ew-resize'}`)
}
let popper = { content: lang?.other?.expand }
</script>

<template>
    <Poppers v-model:props="popper">
        <button data-button @click="expandHandler">
            <Image :src="$img('/lib/expand.webp')" />
        </button>
    </Poppers>
</template>

<style scoped>
[data-button] {
    user-select: none;
    cursor: pointer;
    max-width: 35px;
    max-height: 35px;
    background-color: #4D5DFA;
    border-radius: 50%;
    outline: none;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 9px;
}

[data-button]:hover {
    background-color: #2135ec;
}

img {
    height: 100%;
    width: 100%;
    border-radius: 0;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
}
</style>