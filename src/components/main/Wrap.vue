<script setup lang="ts">
import Nav from './nav/Main.vue'
import Sidebar from './sidebar/Main.vue'
</script>

<template>
    <div id="wrap">
        <Nav />
        <Sidebar />

        <RouterView v-slot="{ Component }">
            <transition name="slide-fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </RouterView>
    </div>
</template>

<style scoped>
#wrap {
    width: 100%;
    height: 100%;
    background-color: var(--wrap-background);

    display: flex;
    align-items: center;
    overflow-x: auto;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: opacity .2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
}
</style>