<script setup lang="ts">
import { inject } from 'vue'

const props: any = inject('$props')
</script>

<template>
    <div data-header>
        <h6 v-text="props?.wrapper.description" />
        <button>Clear</button>
    </div>
</template>

<style scoped>
[data-header] {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
}

[data-header] h6 {
    color: #252540;
    font-size: 18rem;
    font-weight: 600;

    margin-right: 15px;
}

[data-header] button {
    cursor: pointer;
    align-self: flex-start;
    color: #4D5DFA;
    font-size: 18rem;
    font-weight: 500;
    outline: none;
    border: none;
    background: none;
}

[data-header] button:hover {
    text-decoration: underline;
}
</style>