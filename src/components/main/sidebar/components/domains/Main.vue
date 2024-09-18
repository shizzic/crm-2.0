<script setup lang="ts">
import Domains from './Domains.vue'

const hostname: string = window.location.hostname
const isTestDomain: boolean = hostname === import.meta.env.VITE_SELF_DOMAIN_NAME
</script>

<template>
    <Domains v-if="isTestDomain" />
</template>