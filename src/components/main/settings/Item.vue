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
    flex: 1 0 calc(50% - 15rem);
    background-color: var(--color-1);
    border: 2px solid;
    border-color: var(--border-color);
    border-radius: 8px;

    padding: 30rem;
    margin-bottom: 25rem;
}

[data-item]:nth-child(odd) {
    margin-right: 12.5rem;
}

[data-item]:nth-child(even) {
    margin-left: 12.5rem;
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