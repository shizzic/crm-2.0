<script setup lang="ts">
import Search from './Search.vue'
import Expand from '@views/lib/expand/Main.vue'
</script>

<template>
    <section>
        <div data-hat>
            <Search />
            <Expand />
        </div>

        <div data-title-wrapper>
            <h2 v-text="'Settings'" />
            <span data-description v-text="'description'" />
        </div>
    </section>
</template>

<style scoped>
section {
    width: 100%;
    height: 100%;
    background-color: #F9F9F9;

    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    box-shadow: 0 3px 19px 0 rgba(196, 196, 196, 0.45);

    display: flex;
    flex-direction: column;
    padding: 25px;
}

[data-hat] {
    width: 100%;
    height: max-content;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

[data-title-wrapper] {
    width: 100%;

    display: flex;
    flex-direction: column;
    margin: 40px 0;
}

h2 {
    font-size: 28.73rem;
    font-weight: 700;
    color: #252540;

    margin-bottom: 8px;
}

[data-description] {
    font-size: 12.23rem;
    font-weight: 600;
    color: #676767;
}
</style>