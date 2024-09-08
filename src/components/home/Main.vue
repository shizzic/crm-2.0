<script setup lang="ts">
import { useUserStore } from '@stores'
</script>

<template>
    <section>
        <div @click="useUserStore().logout()">Logout</div>Home
    </section>
</template>

<style scoped></style>