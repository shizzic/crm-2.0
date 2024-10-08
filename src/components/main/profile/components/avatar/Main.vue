<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useSettingsStore } from '@stores'
import { useStore } from '../../store'
import type { Props } from '@views/inputs/file'
import { $img } from '@composables'
import Popper from '@views/lib/popper/Main.vue'
import Image from '@views/lib/image/Main.vue'
import File from '@views/inputs/file/Main.vue'
import Cropper from './Cropper.vue'

const $store = useStore()
let popper = { content: useSettingsStore().lang?.profile?.change }
const src = computed(() => $img($store.user?.avatar ?? 'no-photo.webp', 'user/user'))
let fileProps: Props = {
    attributes: {
        name: 'upload_avatar',
        multiple: false,
        accept: 'image/jpg, image/png, image/x-png, image/jpeg, image/pjpeg'
    }
}
const input = useTemplateRef('input')

const loadImage = () => {
    const files = input.value?.$store.model

    if (files && files[0]) {
        const blob = URL.createObjectURL(files[0])
        const reader = new FileReader()

        reader.onload = () => {
            $store.cropper.blob = blob
            $store.cropper.file = files[0]
            $store.cropper.active = true
        }
        reader.readAsArrayBuffer(files[0])
    }
}
</script>

<template>
    <div v-if="$store.user" data-root>
        <div data-avatar-wrapper>
            <Image data-avatar :src="src" :key="src" />

            <Popper v-if="$store.user?.self" v-model:props="popper">
                <div data-button @click="$store.user?.avatar ? $store.crop(0) : input?.element?.click()">
                    <Image :src="$img('profile/edit.webp')" />
                </div>
            </Popper>
        </div>

        <File v-show="false" v-model:props="fileProps" ref="input" @change="loadImage" />
        <Cropper v-if="$store.cropper.active" />
    </div>
</template>

<style scoped>
[data-root] {
    width: 100%;

    padding: 20rem 70rem 0 70rem;
    margin-bottom: 5rem;
}

[data-avatar-wrapper] {
    position: relative;
}

[data-avatar] {
    user-select: none;
    width: 100%;
    height: max-content;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

[data-button] {
    user-select: none;
    cursor: pointer;
    width: 12%;
    background-color: var(--color-5);
    border-radius: 7px;

    position: absolute;
    right: 15%;
    bottom: 0;

    padding: 6rem 8rem;
}

[data-button] img {
    width: 100%;
    padding-bottom: 0;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(127deg) brightness(107%) contrast(101%);
}
</style>