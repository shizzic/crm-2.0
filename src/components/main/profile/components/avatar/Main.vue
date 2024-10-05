<script setup lang="ts">
import type { SubComponentProps } from '@components/main/sidebar'
import { onBeforeMount, computed } from 'vue'
import { useSettingsStore, useUserStore } from '@stores'
import { useStore as useSidebarStore } from '@components/main/sidebar/store'
import { useStore } from '../../store'
import { $img } from '@composables'
import Popper from '@views/lib/popper/Main.vue'
import Image from '@views/lib/image/Main.vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

let popper = { content: useSettingsStore().lang?.profile?.change }
const avatar = computed(() => useStore().user?.avatar ?? 'no-photo.webp')
const props = defineProps<SubComponentProps>()
// onBeforeMount(() => {
//     console.log(useSidebarStore().components.top[props.identifier].component.__asyncResolved.__hmrId)
// })
</script>

<template>
    <div data-root>
        <Image data-avatar :src="$img(avatar, 'user/user')" :key="avatar" />

        <Popper v-if="useStore().user?.self" v-model:props="popper">
            <div data-button>
                <Image :src="$img('profile/edit.webp')" />
            </div>
        </Popper>

        <!-- <cropper class="cropper" :src="$img('/lib/company.webp')" :stencil-props="{
            aspectRatio: 10 / 12
        }"></cropper> -->
    </div>
</template>

<style scoped>
[data-root] {
    position: relative;
    width: 100%;

    padding: 20px 70px 0 70px;
    margin-bottom: 5px;
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
    width: 9%;
    background-color: var(--color-5);
    border-radius: 6px;

    position: absolute;
    right: 23%;
    bottom: 0;

    padding: 5px 6px;
}

[data-button] img {
    width: 100%;
    padding: 2.5px;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(127deg) brightness(107%) contrast(101%);
}
</style>