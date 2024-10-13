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
        content: $store.width === $store.minWidth ? useSettingsStore().lang?.nav?.open_profile : '', placement: 'right'
    }
})
</script>

<template>
    <RouterLink v-once class="router" id="profile_circle" :to="{ name: 'profile', query: { id: useUserStore().id } }">
        <Popper v-model:props="popper" style="width: 100%;">
            <div data-under-popper>
                <Image :src="$img(useUserStore().avatar ?? '/no-photo.webp', 'user/user')"
                    style="border-radius: 50%;" />

                <span v-if="$store.width === $store.maxWidth" data-nav-item-text
                    v-text="useSettingsStore().lang?.components?.profile" />
            </div>
        </Popper>
    </RouterLink>
</template>

<style scoped>
.router {
    cursor: pointer;
    align-self: flex-start;
    width: 100%;
    background-color: transparent;

    display: flex;
    align-items: center;
    justify-content: v-bind(align);
}

#profile_circle {
    align-self: v-bind(align);
    background-color: none;

    display: flex;
    align-items: center;
    justify-content: v-bind(align);
}

a {
    text-decoration: none;
}

#profile_circle img {
    align-self: flex-start;
    border: 3px solid var(--borderColor);

    width: 50rem;
    min-width: 50rem;
    height: 50rem;
    filter: none;
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