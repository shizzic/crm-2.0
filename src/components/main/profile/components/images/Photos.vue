<script setup lang="ts">
import { useTemplateRef, computed, ref, onMounted } from 'vue'
import { useSettingsStore } from '@stores'
import { useStore } from '../../store'
import { $img } from '@composables'
import "viewerjs/dist/viewer.css"
import { directive as viewer } from "v-viewer"
import { } from 'v-viewer'
import { dragscroll as vDragscroll } from 'vue-dragscroll'
import Image from '@views/lib/image/Main.vue'
import New from './new/Main.vue'
import Buttons from './Buttons.vue'
import Popper from '@views/lib/popper/Main.vue'

const $store = useStore()
const wrapper = useTemplateRef('wrapper')
const vViewer = viewer({})
const options = {
    focus: false,
    toolbar: false,
    title: false,
    tooltip: false,
    shown: () => $store.isViewerActive = true,
    hide: () => $store.isViewerActive = false,
    view: (e: any) => $store.currentImageIndex = e.detail.index
}
const images = computed(() => $store.user?.images)
const isClicked = ref(false)
const isMoved = ref(false)
let popper = { content: useSettingsStore().lang?.profile?.add, placement: 'left' }

const scrollHandler = (e: WheelEvent): void => {
    e.preventDefault()
    if (wrapper.value) wrapper.value.scrollLeft += e.deltaY
}

const $viewer: any = useTemplateRef('$viewer')
onMounted(() => {
    setTimeout(() => {
        $store.$viewer = $viewer.value?.viewer
    }, 200)
})
</script>

<template>
    <div data-images-wrapper ref="wrapper" @wheel="scrollHandler" v-dragscroll="true" @mousedown="isClicked = true"
        @mouseup="isClicked = false; isMoved = false;" @mousemove="if (isClicked) isMoved = true;"
        @mouseleave="isClicked = false; isMoved = false;">

        <Popper v-if="$store.user?.self" v-model:props="popper">
            <New :style="{ 'pointer-events': isClicked && isMoved ? 'none' : 'auto' }" />
        </Popper>

        <div data-images v-viewer.rebuild="options" ref="$viewer">
            <Image v-for="src in images" :key="src" :src="$img(src, 'user/user')" data-image
                :style="{ 'pointer-events': isClicked && isMoved ? 'none' : 'auto' }" />
        </div>

        <Buttons v-show="$store.isViewerActive" />
    </div>
</template>

<style scoped>
[data-images-wrapper] {
    user-select: none;
    width: 100%;
    border-radius: 26px;

    display: flex;
    margin-top: 25rem;
    padding-bottom: 20rem;

    overflow-x: auto;
    overflow-y: hidden;
}

[data-images] {
    width: 100%;
    height: 100%;

    display: flex;
}

[data-new-image],
[data-image] {
    cursor: grabbing;
    width: 182rem;
    min-width: 182rem;
    max-width: 182rem;
    height: 177rem;
    min-height: 177rem;
    max-height: 177rem;
    border-radius: 26px;
}

[data-new-image],
[data-image]:not(:last-of-type) {
    margin-right: 15rem;
}

[data-images-wrapper]::-webkit-scrollbar {
    height: 13rem;
}

[data-images-wrapper]::-webkit-scrollbar-track {
    border-radius: 12px;
}

[data-images-wrapper]::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: var(--scroll-color);

    background-clip: content-box;
}
</style>