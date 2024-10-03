<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useStore } from '../../store'
import { $img } from '@composables'
import "viewerjs/dist/viewer.css"
import { directive as viewer } from "v-viewer"
import { dragscroll as vDragscroll } from 'vue-dragscroll'
import Image from '@views/lib/image/Main.vue'
import New from './new/Main.vue'

const wrapper = useTemplateRef('wrapper')
const images = useStore().user?.images
const options = {
    focus: false,
    toolbar: false,
    title: false,
    tooltip: false
}
const vViewer = viewer({})

const scrollHandler = (e: WheelEvent): void => {
    e.preventDefault()
    if (wrapper.value) wrapper.value.scrollLeft += e.deltaY
}
</script>

<template>
    <div data-images v-viewer="options" ref="wrapper" @wheel="scrollHandler" v-dragscroll="true">
        <New />
        <Image v-for="image in images" :key="image" :src="$img(image, 'user/user')" data-image />
    </div>
</template>

<style scoped>
[data-images] {
    user-select: none;
    width: 100%;
    border-radius: 26px;

    display: flex;
    margin-top: 25rem;

    overflow-x: auto;
    overflow-y: hidden;
}

[data-new-image],
[data-image] {
    cursor: pointer;
    width: 182px;
    min-width: 182px;
    max-width: 182px;
    height: 177px;
    min-height: 177px;
    max-height: 177px;
    border-radius: 26px;
}

[data-image] {
    margin-left: 15px;
}
</style>