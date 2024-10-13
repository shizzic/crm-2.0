<script setup lang="ts">
import { computed, inject } from 'vue'
import type { ComputedRef } from 'vue'
import { useSettingsStore, useUserStore } from '@stores'
import type { Props } from '@views/lib/popper'
import { $img } from '@composables'
import { useNavStore } from '../store'
import Popper from '@views/lib/popper/Main.vue'
import Image from '@views/lib/image/Main.vue'

const $store = useNavStore()
const align = inject('align') as string
const popper: ComputedRef<Props> = computed(() => {
    return {
        content: $store.width === $store.minWidth ? useSettingsStore().lang?.nav?.logout : '', placement: 'right'
    }
})
</script>

<template>
    <div id="logout" class="router" @click="useUserStore().logout()">
        <Popper v-model:props="popper" style="width: 100%">
            <div data-under-popper>
                <Image :src="$img('nav/logout.webp')" />

                <span v-if="$store.width === $store.maxWidth" data-nav-item-text
                    v-text="useSettingsStore().lang?.components?.profile" />
            </div>
        </Popper>
    </div>
</template>

<style scoped>
#logout {
    width: 100%;

    background-color: transparent;
    justify-self: flex-end;
    border-radius: 0;

    padding: 0;
}

.router {
    cursor: pointer;
    align-self: flex-start;
    width: 100%;
    background-color: transparent;

    display: flex;
    align-items: center;
    justify-content: v-bind(align);
}

img {
    align-self: flex-start;

    width: 35rem;
    min-width: 35rem;
    height: 35rem;
    border-radius: 0;
}

[data-under-popper] {
    display: flex;
    align-items: center;
    justify-content: v-bind(align);
}

[data-nav-item-text] {
    font-weight: 600;
    font-size: 17rem;
    letter-spacing: -0.02em;
    color: var(--color);
    word-break: break-all;

    padding-left: 10rem;
}
</style>