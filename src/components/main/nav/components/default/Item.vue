<script setup lang="ts">
import { ref, useTemplateRef, provide, watch, computed, inject } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { Item } from '../..'
import type { Props as PopperProps } from '@views/lib/popper'
import { $img } from '@composables'
import { $getFilter } from '@composables/icon'
import { onClickOutside } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { useSettingsStore } from '@stores'
import { useNavStore } from '../../store'
import { emitter } from '../..'
import Popper from '@views/lib/popper/Main.vue'
import Image from '@views/lib/image/Main.vue'
import List from './List.vue'

const $store = useNavStore()
const $route = useRoute()
const props = defineProps<Item>()
const active = ref(false)
const element: any = useTemplateRef('element')
const top = ref(0)
const selected = computed(() => isSelected(props))
const filter: Ref<string> = ref('')
const iconBackground = computed(() => selected.value ? 'var(--color-6)' : 'var(--bg)')
const align = inject('align') as string
const popper: ComputedRef<PopperProps> = computed(() => {
    return {
        content: $store.width === $store.maxWidth ? '' : useSettingsStore().lang?.components?.[props.alias ?? props.name],
        placement: "right"
    }
})

changeFilter(selected.value)
function openList(): void {
    if (!props.list) return
    top.value = element.value.getBoundingClientRect().top
    active.value = true
}
onClickOutside(element, () => active.value = false)
provide('top', top)
provide('isSelected', isSelected)
function isSelected(data: Item): boolean {
    if (data.list)
        for (const item of data.list)
            if (isSelected(item))
                return true

    return $route.name === data.name
}
function changeFilter(value: boolean): void {
    filter.value = $getFilter(getComputedStyle(document.documentElement).getPropertyValue(value ? '--color-1' : '--nav-image-filter'))
}
watch(selected, (value) => changeFilter(value))
watch(() => useSettingsStore().theme, () => {
    setTimeout(() => changeFilter(selected.value), 20)
})
emitter.on('closeList', () => active.value = false)
</script>

<template>
    <component :is="props.list ? 'div' : 'RouterLink'" class="router router_from_store" :data-selected="selected"
        :to="{ path: props.name }" :target="useSettingsStore().linkTarget" ref="element">
        <div data-under-popper>
            <div data-under-popper @click="openList">
                <Popper v-model:props="popper" style=" width: 100%;">
                    <div data-img>
                        <Image :src="$img(String(props.icon))" />
                    </div>
                </Popper>

                <span v-if="$store.width === $store.maxWidth" data-nav-item-text
                    v-text="useSettingsStore().lang?.components?.[props.alias ?? props.name]" />
            </div>

            <Transition name="slide-right" mode="out-in">
                <List v-if="active && $store.isDeeper(props)" v-bind="props" />
            </Transition>
        </div>
    </component>
</template>

<style scoped>
.router {
    cursor: inherit;
    align-self: flex-start;
    width: 100%;
    background-color: transparent;

    display: flex;
    align-items: center;
    justify-content: v-bind(align);
}

.router_from_store:not(:last-of-type) {
    margin-bottom: 20rem;
}

a {
    text-decoration: none;
}

[data-under-popper] {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: v-bind(align);
}

[data-img] {
    align-self: flex-start;
    width: 50rem;
    min-width: 50rem;
    height: 50rem;
    background-color: v-bind(iconBackground);
    border-radius: 50%;

    padding: 10rem;
    margin: 0 auto;
}

[data-img] img {
    width: 100%;
    height: 100%;
    filter: v-bind(filter);
}

[data-selected="true"] {
    background-color: var(--color-6);
}

[data-nav-item-text] {
    font-weight: 600;
    font-size: 17rem;
    letter-spacing: -0.02em;
    color: var(--color);
    word-break: break-all;
    width: 100%;
    min-width: 100%;

    padding-left: 10rem;
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