<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import { useStore } from './store'
import Resize from './Resize.vue'
import { $removeComponentStyle, $setComponentStyle } from '@/assets/composables/theme';
const Projects = defineAsyncComponent(() => import('./components/Projects.vue'))
const Domains = defineAsyncComponent(() => import('./components/domains/Main.vue'))

const $store = useStore()
const sidebarPadding = computed(() => $store.cssWidth ? 'var(--padding)' : 0)

$removeComponentStyle()
$setComponentStyle(String('profile'))
</script>

<template>
    <aside>
        <component v-for="(item, identifier) in $store.components.top" :is="{ ...item.component }"
            :key="item?.component?.__asyncResolved?.__hmrId" :identifier="identifier" :place="'top'" />
        <Resize />
        <Projects />
        <Domains />
        <component v-for="(item, identifier) in $store.components.bottom" :is="{ ...item.component }"
            :key="item?.component?.__asyncResolved?.__hmrId" :identifier="identifier" :place="'bottom'" />
    </aside>
</template>

<style scoped>
aside {
    position: relative;
    min-width: var(--sidebar-width);
    width: var(--sidebar-width);
    max-width: var(--sidebar-width);
    height: 100%;

    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    padding: v-bind(sidebarPadding);
    transition: var(--sidebar-width-transition);
}

aside>* {
    margin-bottom: 20px;
}

aside:last-child {
    margin-bottom: 0;
}
</style>