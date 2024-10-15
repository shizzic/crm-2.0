<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useSettingsStore, useSidebarStore } from '@stores'
import { $img } from '@composables'
import Poppers from '@views/lib/popper/Main.vue'
import Image from '@views/lib/image/Main.vue'
import type { Props } from '@views/lib/popper'

const popper: ComputedRef<Props> = computed(() => {
    return {
        content: ref(useSettingsStore().lang?.other?.expand).value
    }
})
</script>

<template>
    <Poppers v-model:props="popper">
        <button data-button @click="useSidebarStore().expand()">
            <Image :src="$img('/lib/expand.webp')" />
        </button>
    </Poppers>
</template>

<style scoped>
[data-button] {
    user-select: none;
    cursor: pointer;
    max-width: 35rem;
    max-height: 35rem;
    background-color: var(--expand-backgroundColor);
    border-radius: 50%;
    outline: none;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 9rem;
}

[data-button]:hover {
    background-color: var(--expand-hover-backgroundColor);
}

img {
    height: 100%;
    width: 100%;
    border-radius: 0;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
}
</style>