<script setup lang="ts">
import { useSettingsStore } from '@stores'
</script>

<template>
    <span>{{ useSettingsStore().lang?.other?.noData }}</span>
</template>

<style scoped>
span {
    font-weight: 500;
    font-size: 18rem;
    letter-spacing: -0.02em;
    color: var(--color-3);

    padding-bottom: 15rem;
    margin: 0 auto;
}
</style>