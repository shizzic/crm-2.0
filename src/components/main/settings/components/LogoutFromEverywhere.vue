<script setup lang="ts">
import { useSettingsStore } from '@stores'
</script>

<template>
    <button data-logout-btn v-text="useSettingsStore().lang?.other?.logout" />
</template>

<style scoped>
[data-logout-btn] {
    cursor: pointer;
    outline: none;
    border: none;
    font-weight: 600;
    font-size: 11rem;
    letter-spacing: -0.02em;
    border-radius: 49px;
    color: var(--color);
    background-color: var(--bg);

    padding: 10rem 25rem;
}
</style>