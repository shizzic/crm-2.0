<script setup lang="ts">
import { computed, ref, useTemplateRef, provide, watch } from 'vue'
import type { Item } from '..'
import { emitter } from '..'
import { $img } from '@composables'
import { $getFilter } from '@composables/icon'
import { onClickOutside } from '@vueuse/core'
import Image from '@views/lib/image/Main.vue'
import List from './List.vue'

const props = defineProps<Item>()
const filter = computed(() => $getFilter(getComputedStyle(document.documentElement).getPropertyValue('--nav-image-filter')))
const active = ref(false)
const element: any = useTemplateRef('element')
const top = ref(0)
const selected = ref(false)

function openList(): void {
    if (!props.list) return
    top.value = element.value.getBoundingClientRect().top
    active.value = true
}
onClickOutside(element, () => active.value = false)
provide('top', top)
watch(selected, (value) => {
    $getFilter(getComputedStyle(document.documentElement).getPropertyValue(value ? '--color-1' : '--nav-image-filter'))
})
emitter.on('select', (value) => selected.value = value)
</script>

<template>
    <component :is="props.list ? 'div' : 'RouterLink'" class="router_from_store" :data-selected="selected"
        :to="{ path: props.name }" @click="openList" ref="element">
        <Image :src="$img(String(props.icon))" />

        <Transition name="slide-right" mode="out-in">
            <List v-show="active" v-bind="props" />
        </Transition>
    </component>
</template>

<style scoped>
.router_from_store {
    background-color: var(--bg);
}

.router_from_store:not(:last-of-type) {
    margin-bottom: 20rem;
}

.router_from_store img {
    filter: v-bind(filter);

    padding: 10rem;
}

[data-selected="true"] {
    background-color: var(--color-6);
}

.slide-right-enter-active,
.slide-right-leave-active {
    transition: all .2s ease-out;
}

.slide-right-enter-from {
    opacity: 0;
    transform: translateX(-25rem);
}

.slide-right-leave-to {
    opacity: 0;
    transform: translateX(25rem);
}
</style>