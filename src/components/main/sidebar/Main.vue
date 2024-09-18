<script setup lang="ts">
import ProfilePreview from './components/ProfilePreview.vue'
import Projects from './components/Projects.vue'
import Domains from './components/domains/Main.vue'
</script>

<template>
    <aside>
        <ProfilePreview />
        <Projects />
        <Domains />
    </aside>
</template>

<style scoped>
aside {
    width: 450px;
    height: 100%;

    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    /* background-color: #3045ff; */
}

aside>* {
    margin-bottom: 20px;
}

aside:last-child {
    margin-bottom: 0;
}
</style>