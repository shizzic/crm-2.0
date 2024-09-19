<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useHttpStore } from '@stores'
import { Skeletor } from 'vue-skeletor'
import 'vue-skeletor/dist/vue-skeletor.css'

const media: Ref<string | undefined> = ref(undefined)
const isFetched: Ref<boolean> = ref(false)

interface Props {
    src: string
}
const props = defineProps<Props>()

// если это ссылка, то я делаю подгрузку raw данных фотографии, если нет, то подгружаю с локальных ассетов
const get = async function (src: string) {
    if (src.search("https") !== -1) {
        fetch(src, {
            headers: useHttpStore().raw_headers(),
            credentials: "include",
            cache: 'force-cache',
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

props.src ? get(props.src) : isFetched.value = true
</script>

<template>
    <img v-if="isFetched && media" :src="media" loading="eager">
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