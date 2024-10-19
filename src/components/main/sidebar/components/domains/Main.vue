<script setup lang="ts">
import Domains from './Domains.vue'

// отображаю селект доменов только, если доменное имя в браузере совпадает с названием корневого домена для билда
const isTestDomain: boolean = window.location.hostname === import.meta.env.VITE_SELF_DOMAIN_NAME
</script>

<template>
    <Domains v-if="isTestDomain" />
</template>