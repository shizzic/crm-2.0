<script setup lang="ts">
import { useSettingsStore } from '@stores'
import { useStore } from '../../store'
import { $img } from '@composables'
import Image from '@views/lib/image/Main.vue'
import Popper from '@views/lib/popper/Main.vue'

const $store = useStore()
let deletePopper = { content: useSettingsStore().lang?.profile?.delete }
let avatarPopper = { content: useSettingsStore().lang?.profile?.avatar }
</script>

<template>
    <div data-buttons>
        <Popper v-model:props="deletePopper">
            <div data-button @click="$store.deleteImage">
                <Image :src="$img('/lib/delete.webp')" />
            </div>
        </Popper>

        <Popper v-model:props="avatarPopper">
            <div v-show="$store.user?.images?.[0]?.split('/').slice(0, -1).pop() !== '0'" data-button
                @click="$store.crop($store.currentImageIndex)">
                <Image :src="$img('/profile/makeAvatar.webp')" />
            </div>
        </Popper>
    </div>
</template>

<style scoped>
[data-buttons] {
    z-index: 9999;
    height: max-content;
    width: max-content;

    position: absolute;
    left: 0;
    top: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

[data-button] {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);

    position: relative;
    left: 0;
    top: 0;

    padding: 15rem 28rem;
}

[data-button]:hover {
    background-color: rgba(0, 0, 0, 0.7);
}

[data-button] img {
    width: 26rem;
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(856%) hue-rotate(97deg) brightness(118%) contrast(91%);


}
</style>