<script setup lang="ts">
import { useTemplateRef, watch } from 'vue'
import { $img } from '@composables'
import { $getFilter } from '@composables/icon'
import type { Props } from '@views/inputs/file'
import Image from '@views/lib/image/Main.vue'
import File from '@views/inputs/file/Main.vue'

const filter = $getFilter(getComputedStyle(document.documentElement).getPropertyValue('--new-image-filter'))
let props: Props = {
    attributes: {
        name: 'new_image_for_profile',
        multiple: true,
        accept: 'image/jpg, image/png, image/x-png, image/jpeg, image/pjpeg'
    }
}
const input: any = useTemplateRef('input')
watch(input, (element: any) => {
    console.log(element)
}, { deep: true })
</script>

<template>
    <div data-new-image @click="input?.element?.click()">
        <Image :src="$img('/lib/image.webp')" />
        <File v-show="false" v-model:props="props" ref="input" />
    </div>
</template>

<style scoped>
[data-new-image] {
    background-color: var(--backgroundColor);

    display: flex;
    justify-content: center;
    align-items: center;
}

[data-new-image] img {
    pointer-events: none;
    width: 55px;
    min-width: 55px;
    max-width: 55px;
    height: 44px;
    min-height: 44px;
    max-height: 44px;
    border-radius: 0;
    filter: v-bind(filter);
}
</style>