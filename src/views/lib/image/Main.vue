<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Ref } from 'vue'
import { useHttpStore, useImageStore } from '@stores'
import type { Props } from './'
import { Skeletor } from 'vue-skeletor'
import 'vue-skeletor/dist/vue-skeletor.css'

const media: Ref<string | undefined> = ref(undefined)
const isFetched: Ref<boolean> = ref(false)
const props = defineProps<Props>()
const isRecacheNeeded = computed(() => props.src in useImageStore().recache)
const isLink = computed(() => props.src.search("https") > -1)

watch(isRecacheNeeded, (value) => {
    if (value) getBlobWithRecached()
})

// если это ссылка, то я делаю подгрузку raw данных фотографии, если нет, то подгружаю с локальных ассетов
const getBlob = async function (src: string, cache?: any) {
    if (isLink.value) {
        fetch(src, {
            headers: useHttpStore().raw_headers(),
            credentials: "include",
            cache: cache ?? 'force-cache'
        })
            .then(r => { return r.blob() })
            .then(blob => {
                media.value = URL.createObjectURL(blob)
                isFetched.value = true
            })
    } else {
        media.value = src
        isFetched.value = true
    }
}

function getBlobWithRecached(): void {
    getBlob(props.src, 'default')
    delete useImageStore().recache[props.src]
}

if (props.src) {
    isRecacheNeeded.value ? getBlobWithRecached() : getBlob(props.src)
} else
    isFetched.value = true
</script>

<template>
    <img v-if="isFetched && media" :src="media" loading="lazy" :key="String(isRecacheNeeded)">
    <Skeletor v-else-if="!media && !isFetched" data-skeletor />
</template>

<style scoped>
img {
    width: inherit;
    max-width: inherit;
    height: inherit;
    max-height: inherit;
    border-radius: inherit;
    object-fit: cover;
}

[data-skeletor] {
    width: inherit;
    height: inherit;
    border-radius: inherit;
}
</style>