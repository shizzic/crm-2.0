<script setup lang="ts">
interface Props {
    title: string,
    description?: string
}
const { title, description } = defineProps<Props>()
</script>

<template>
    <div data-item>
        <h3 v-text="title" />
        <h4 v-if="description" v-text="description" />

        <slot />
    </div>
</template>

<style scoped>
[data-item] {
    width: 50%;
    min-width: 315px;
    background-color: #ffffff;
    border: 2px solid #C4C4C4;
    border-radius: 8px;

    padding: 30px;
}

h3 {
    font-size: 18rem;
    font-weight: 600;
    color: #252540;

    padding-bottom: 12px;
}

h4 {
    font-size: 14rem;
    font-weight: 600;
    color: #3F3F57;

    padding-bottom: 20px;
}
</style>