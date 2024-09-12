<script setup lang="ts">
import ProfilePreview from './components/ProfilePreview.vue'
import Projects from './components/Projects.vue';
</script>

<template>
    <aside>
        <ProfilePreview />
        <Projects />
    </aside>
</template>

<style scoped>
aside {
    width: 500px;
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