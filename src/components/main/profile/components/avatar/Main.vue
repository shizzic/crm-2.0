<script setup lang="ts">
// import type { SubComponentProps } from '@components/main/sidebar'
import { computed } from 'vue'
import { useSettingsStore } from '@stores'
// import { useStore as useSidebarStore } from '@components/main/sidebar/store'
import { useStore } from '../../store'
import { $img } from '@composables'
import { fetcher } from '@composables/fetcher'
import Popper from '@views/lib/popper/Main.vue'
import Image from '@views/lib/image/Main.vue'
import Cropper from './Cropper.vue'

const $store = useStore()
let popper = { content: useSettingsStore().lang?.profile?.change }
const avatar = computed(() => $store.user?.avatar ?? 'no-photo.webp')
// const props = defineProps<SubComponentProps>()
// onBeforeMount(() => {
//     console.log(useSidebarStore().components.top[props.identifier].component.__asyncResolved.__hmrId)
// })

const reCropCurrentAvatar = async (): Promise<void> => {
    if (!$store.user) return
    $store.cropper.blob = await fetcher.blob.get($img($store.user.images[0], 'user/user'))
    $store.cropper.src = $store.user.images[0]
    $store.cropper.active = true
}
</script>

<template>
    <div data-root>
        <div data-avatar-wrapper>
            <Image data-avatar :src="$img(avatar, 'user/user')" :key="avatar" />

            <Popper v-if="$store.user?.self && $store.user?.avatar" v-model:props="popper">
                <div data-button @click="reCropCurrentAvatar">
                    <Image :src="$img('profile/edit.webp')" />
                </div>
            </Popper>
        </div>

        <Cropper v-if="$store.cropper.active" />
    </div>
</template>

<style scoped>
[data-root] {
    width: 100%;

    padding: 20px 70px 0 70px;
    margin-bottom: 5px;
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
    cursor: pointer;
    width: 12%;
    background-color: var(--color-5);
    border-radius: 7px;

    position: absolute;
    right: 15%;
    bottom: 0;

    padding: 6px 8px;
}

[data-button] img {
    width: 100%;
    padding-bottom: 0;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(127deg) brightness(107%) contrast(101%);
}
</style>