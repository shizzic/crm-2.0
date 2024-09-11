<script setup lang="ts">
import ProfilePreview from './components/ProfilePreview.vue'
</script>

<template>
    <aside>
        <ProfilePreview />
    </aside>
</template>

<style scoped>
aside {
    width: 500px;
    height: 100%;

    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>