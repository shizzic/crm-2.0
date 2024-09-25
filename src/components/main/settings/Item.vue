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
    background-color: #ffffff;
    border: 2px solid #C4C4C4;
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
    color: #252540;

    padding-bottom: 12rem;
}

h4 {
    font-size: 14rem;
    font-weight: 600;
    color: #3F3F57;

    padding-bottom: 20rem;
}
</style>