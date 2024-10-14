<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import type { ComputedRef } from 'vue'
import { useSettingsStore, useUserStore } from '@stores'
import type { Props } from '@views/lib/popper'
import { $img } from '@composables'
import { useNavStore } from '../store'
import { $getFilter } from '@composables/icon'
import Popper from '@views/lib/popper/Main.vue'
import Image from '@views/lib/image/Main.vue'

const $store = useNavStore()
const align = inject('align') as string
const filter = ref('')
const popper: ComputedRef<Props> = computed(() => {
    return {
        content: $store.width === $store.minWidth ? useSettingsStore().lang?.nav?.logout : '', placement: 'right'
    }
})

changeFilter()
function changeFilter(): void {
    filter.value = $getFilter(getComputedStyle(document.documentElement).getPropertyValue('--color-6'))
}
watch(() => useSettingsStore().theme, () => {
    setTimeout(() => changeFilter(), 20)
})
</script>

<template>
    <div id="logout" class="router" @click="useUserStore().logout()">
        <Popper v-model:props="popper" style="width: 100%">
            <div data-under-popper>
                <Image :src="$img('nav/logout.webp')" />

                <span v-if="$store.width === $store.maxWidth" data-nav-item-text
                    v-text="useSettingsStore().lang?.nav?.logout" />
            </div>
        </Popper>
    </div>
</template>

<style scoped>
#logout {
    width: 100%;
    flex-grow: 1;

    background-color: transparent;
    justify-self: flex-end;
    border-radius: 0;

    padding: 0;
}

.router {
    cursor: pointer;
    align-self: flex-start;
    background-color: transparent;
    width: 100%;

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
    filter: v-bind(filter);
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