<script setup lang="ts">
import Nav from './nav/Main.vue'
import Sidebar from './sidebar/Main.vue'
</script>

<template>
    <div id="wrap">
        <Nav />
        <Sidebar />

        <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>