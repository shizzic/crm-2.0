<script setup lang="ts">
import { useStore } from '../../store'
import { useSettingsStore } from '@stores'
import { $getFilter } from '@composables/icon'
import { $img } from '@composables'
import Image from '@views/lib/image/Main.vue'
import Popper from '@views/lib/popper/Main.vue'

const $store = useStore()
const filter = $getFilter(getComputedStyle(document.documentElement).getPropertyValue('--expander-backgroundColor'))
</script>

<template>
    <div data-expander-wrapper>
        <Popper :content="useSettingsStore().lang?.profile?.expand[String($store.$fields.expand)]" :placement="'top'">
            <div data-expander @click="$store.$fields.expand = !$store.$fields.expand">
                <Image :src="$img('/profile/expander.webp')" />
                <i data-arrow :data-arrow-active="!$store.$fields.expand" />
            </div>
        </Popper>
    </div>
</template>

<style scoped>
[data-expander-wrapper] {
    position: absolute;
    bottom: -35rem;
    right: 0;
}

[data-expander] {
    user-select: none;
    width: 250rem;

    display: flex;
    justify-content: center;
    align-items: center;
}

[data-expander] img {
    cursor: pointer;
    filter: v-bind(filter);
}

[data-arrow] {
    cursor: pointer;
    position: absolute;

    border: solid var(--color);
    border-width: 0 2px 2px 0;

    display: inline-block;
    padding: 3rem;

    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    transition: transform .5s ease-out, -webkit-transform .3s ease-out;
}

[data-arrow-active="true"] {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
</style>