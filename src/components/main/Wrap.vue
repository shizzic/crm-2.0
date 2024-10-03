<script setup lang="ts">
import Nav from './nav/Main.vue'
import Sidebar from './sidebar/Main.vue'
</script>

<template>
    <div id="wrap">
        <Nav />
        <Sidebar />

        <RouterView />
    </div>
</template>

<style scoped>
#wrap {
    width: 100%;
    height: 100%;
    background-color: var(--wrap-background);

    display: flex;
    align-items: center;
    overflow-x: auto;
}
</style>