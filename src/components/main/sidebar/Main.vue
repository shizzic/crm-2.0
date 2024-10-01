<script setup lang="ts">
import Resize from './Resize.vue'
import Projects from './components/Projects.vue'
import Domains from './components/domains/Main.vue'
</script>

<template>
    <aside>
        <Resize />

        <Projects v-once />
        <Domains v-once />
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