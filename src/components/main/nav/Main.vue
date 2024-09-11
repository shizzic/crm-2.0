<script setup lang="ts">
import { useUserStore } from '@stores'
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
    width: 82px;
    height: 100%;
    background-color: #FFFFFF;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;

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
}

#logout {
    background-color: none;
}
</style>