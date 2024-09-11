<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import type { Ref } from 'vue'
import { useHttpStore } from '@stores'

var media: Ref<string | undefined> = ref(undefined)
var isFetched: Ref<boolean> = ref(false)

interface Props {
    src: string
}
const props = defineProps<Props>()

onBeforeMount(() => {
    props.src ? get(props.src) : isFetched.value = true
})

// если это ссылка, то я делаю подгрузку raw данных фотографии, если нет, то подгружаю с локальных ассетов
const get = async function (src: string) {
    if (src.search("https") !== -1) {
        fetch(src, {
            headers: useHttpStore().raw_headers(),
            credentials: "include",
        })
            .then(res => { return res.blob() })
            .then(blob => {
                media.value = URL.createObjectURL(blob)
                isFetched.value = true
            })
    } else {
        media.value = src
        isFetched.value = true
    }
}
</script>

<template>
    <img v-if="isFetched && media" :src="media" loading="lazy" />
    <!-- <Skeletor v-else-if="!media && !isFetched" class="skeletor" /> -->
</template>

<style scoped>
img {
    object-fit: cover;
}

.skeletor {
    border-radius: inherit;
}
</style>