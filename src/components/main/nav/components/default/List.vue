<script setup lang="ts">
import { provide, inject, computed } from 'vue'
import type { Ref } from 'vue'
import { useSettingsStore } from '@stores'
import { useNavStore } from '../../store'
import type { Item } from '../..'
import Li from './Li.vue'

const $store = useNavStore()
const lang = useSettingsStore().lang
const top = inject('top') as Ref<number>
const props = defineProps<Item>()
const left = computed(() => top ? `${$store.width}rem` : `100%`)

provide('props', props)
provide('top', 0)
</script>

<template>
    <div data-nav-list>
        <h3 v-text="lang?.components?.[props.name]" />

        <ul>
            <Li v-for="(item, index) in props.list" :key="index" v-bind="item" />
        </ul>
    </div>
</template>

<style scoped>
[data-nav-list] {
    z-index: 999;
    cursor: default;
    position: absolute;
    left: v-bind(left);
    top: v-bind("`${top}px`");

    min-width: 166rem;
    background-color: var(--color-6);

    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 25rem 0;
    padding-bottom: 10rem;
}

h3 {
    font-weight: 700;
    font-size: 20rem;
    letter-spacing: -0.02em;
    color: var(--color-1);

    padding: 0 15rem;
    margin-bottom: 10rem;
}

ul {
    width: 100%;
    list-style-type: none;
}
</style>