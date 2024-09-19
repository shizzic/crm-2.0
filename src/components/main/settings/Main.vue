<script setup lang="ts">
import Expand from '@views/lib/expand/Main.vue'
</script>

<template>
    <section>
        <span>Settings</span>
        <Expand />
    </section>
</template>

<style scoped>
section {
    width: 100%;
    height: 100%;

    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    box-shadow: 0 3px 19px 0 rgba(196, 196, 196, 0.45);

    display: flex;
    justify-content: space-between;
    padding: 20px;
}
</style>