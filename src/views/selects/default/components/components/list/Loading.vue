<script setup lang="ts">
import { useSettingsStore } from '@stores'
</script>

<template>
    <span>{{ useSettingsStore().lang?.other?.loading }}</span>
</template>

<style scoped>
span {
    font-weight: 600;
    font-size: 22rem;
    letter-spacing: -0.02em;
    color: var(--color-6);

    padding-bottom: 15rem;
    margin: 0 auto;
}
</style>