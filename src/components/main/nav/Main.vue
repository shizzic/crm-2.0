<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@stores'
import { getFilter } from '@composables/icon'

const filter = computed(() => getFilter(getComputedStyle(document.documentElement).getPropertyValue('--color-3')))
</script>

<template>
    <nav>
        <div v-once class="router" id="logout" @click="useUserStore().logout()">
            <img src="@assets/images/nav/logout.webp">
        </div>
    </nav>
</template>

<style scoped>
nav {
    min-width: 82px;
    /* max-width: 82px; */
    height: 100%;
    background-color: var(--color-1);
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    user-select: none;

    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 20px 0;
}

.router {
    cursor: pointer;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    padding: 10px 0;
}

img {
    width: 50%;
    filter: v-bind(filter);
}

#logout {
    background-color: none;
}
</style>