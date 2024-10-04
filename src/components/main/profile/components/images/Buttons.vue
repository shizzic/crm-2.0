<script setup lang="ts">
import { useSettingsStore } from '@stores'
import { useStore } from '../../store'
import { $img } from '@composables'
import Image from '@views/lib/image/Main.vue'
import Popper from '@views/lib/popper/Main.vue'

const props = { content: useSettingsStore().lang?.profile?.delete }
</script>

<template>
    <div data-buttons>
        <Popper v-model:props="props">
            <div data-button @click="useStore().deleteImage()">
                <Image :src="$img('/lib/delete.webp')" />
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

    padding: 15px 28px;
}

[data-button]:hover {
    background-color: rgba(0, 0, 0, 0.7);
}

[data-button] img {
    width: 26px;
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(856%) hue-rotate(97deg) brightness(118%) contrast(91%);


}
</style>