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
    width: calc(50% - 35px);
    background-color: var(--color-1);
    border: 2px solid;
    border-color: var(--border-color);
    border-radius: 8px;

    padding: 30rem 30px;
    margin-bottom: 25rem;
    margin-right: 30px;
}

[data-item]:nth-child(2) {
    width: 50%;

    margin-right: 0;
}

h3 {
    font-size: 18rem;
    font-weight: 600;
    color: var(--color-6);

    padding-bottom: 12rem;
}

h4 {
    font-size: 14rem;
    font-weight: 600;
    color: var(--color-3);

    padding-bottom: 20rem;
}
</style>