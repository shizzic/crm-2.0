<script setup lang="ts">
import Inner from './Inner.vue'
</script>

<template>
    <section>
        <RouterLink :to="{ name: 'home' }">to home</RouterLink>
        <Inner />
    </section>
</template>