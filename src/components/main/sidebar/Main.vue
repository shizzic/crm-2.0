<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useStore } from './store'
import Resize from './Resize.vue'
const Projects = defineAsyncComponent(() => import('./components/Projects.vue'))
const Domains = defineAsyncComponent(() => import('./components/domains/Main.vue'))

const $store = useStore()
</script>

<template>
    <aside :style="{ padding: $store.cssWidth ? 'var(--padding)' : 0 }">
        <component v-for="(component, name) in $store.components.top" :key="name" :is="{ ...component }" />
        <Resize />
        <Projects />
        <Domains />
        <component v-for="(component, name) in $store.components.bottom" :key="name" :is="{ ...component }" />
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
    transition: var(--sidebar-width-transition);
}

aside>* {
    margin-bottom: 20px;
}

aside:last-child {
    margin-bottom: 0;
}
</style>