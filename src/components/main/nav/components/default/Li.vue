<script setup lang="ts">
import { ref, computed, useTemplateRef, inject } from 'vue'
import { useSettingsStore } from '@stores'
import type { Item } from '../..'
import { onClickOutside } from '@vueuse/core'
import { emitter } from '../..'
import { useNavStore } from '../../store'
import List from './List.vue'

const lang = useSettingsStore().lang
let props = defineProps<Item>()
const $store = useNavStore()
const active = ref(false)
const element: any = useTemplateRef('element')
const isSelected = inject('isSelected') as (data: Item) => boolean
const selected = computed(() => isSelected(props))

function close(): void {
    emitter.emit('closeList')
    active.value = false
}
function openList(): void {
    if (!props.list) return close()
    active.value = true
}
onClickOutside(element, () => active.value = false)
</script>

<template>
    <li>
        <i v-show="selected" />

        <component :is="props.list ? 'span' : 'RouterLink'" :to="{ name: props.name }" @click="openList"
            :data-selected="selected">
            {{ props.alias ? lang?.nav?.aliases?.[props.alias] : lang?.components?.[props.name] }}

            <Transition name="slide-right" mode="out-in">
                <List v-if="active && $store.isDeeper(props)" v-bind="props" ref="element" />
            </Transition>
        </component>
    </li>
</template>

<style scoped>
li {
    position: relative;
    cursor: pointer;
    width: 100%;

    display: flex;
    align-items: center;
}

i {
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-left: 16px solid var(--color-1);
    border-bottom: 12px solid transparent;

    position: absolute;
    left: 0;
    transition: left .15s ease-out;
}

a {
    text-decoration: none;
}

span,
a {
    font-weight: 500;
    font-size: 14rem;
    letter-spacing: -0.02em;
    color: var(--color-4);
    width: 100%;

    padding: 15rem 15rem;
}

[data-selected="true"] {
    font-weight: 600;
    font-size: 16rem;
    color: var(--color-1);

    padding-left: 23rem;
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