<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useStore } from './store'
import Resize from './Resize.vue'
const Projects = defineAsyncComponent(() => import('./components/Projects.vue'))
const Domains = defineAsyncComponent(() => import('./components/domains/Main.vue'))
</script>

<template>
    <aside :style="{ padding: useStore().cssWidth ? 'var(--padding)' : 0 }">
        <Resize />

        <Projects />
        <Domains />
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