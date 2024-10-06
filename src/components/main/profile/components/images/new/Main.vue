<script setup lang="ts">
import { useTemplateRef, watch } from 'vue'
import { $img } from '@composables'
import { $getFilter } from '@composables/icon'
import type { Props } from '@views/inputs/file'
import { useStore } from '../../../store'
import { fetcher } from '@composables/fetcher'
import type { ImagesResponse } from '../../../store/images'
import Image from '@views/lib/image/Main.vue'
import File from '@views/inputs/file/Main.vue'

const $store = useStore()
const filter = $getFilter(getComputedStyle(document.documentElement).getPropertyValue('--new-image-filter'))
const input = useTemplateRef('input')

let props: Props = {
    attributes: {
        name: 'upload_image_to_profile',
        multiple: true,
        accept: 'image/jpg, image/png, image/x-png, image/jpeg, image/pjpeg'
    }
}

const uploadImages = async (files: FileList): Promise<void> => {
    const form = new FormData()
    for (const file of files) form.append(file.name, file)
    const response: ImagesResponse = await fetcher.media.post('user/user/save-images', form)

    if (input.value) input.value.$store.model = new DataTransfer().files
    $store.updateImages(response)
}
watch(() => input.value?.$store?.model, (files) => { if (files && files.length > 0) uploadImages(files) })
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