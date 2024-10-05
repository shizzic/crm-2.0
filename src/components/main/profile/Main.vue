<script setup lang="ts">
import { onBeforeUnmount, defineAsyncComponent, watch } from 'vue'
import { fetcher } from '@composables/fetcher'
import { useRoute } from 'vue-router'
import { useStore } from './store'
import { useStore as useSidebarStore } from '@components/main/sidebar/store'
import { $setComponentStyle } from '@composables/theme'
import Info from './components/info/Main.vue'
import Images from './components/images/Main.vue'
const Avatar = defineAsyncComponent(() => import('./components/avatar/Main.vue'))

$setComponentStyle('profile')
const $store = useStore()
fetcher.get('user/user/get-profile?target_id=' + useRoute().query.id)
    .then((r: any) => {
        $store.user = r?.data?.user
        $store.roles = r?.data?.roles
    })

onBeforeUnmount(() => $store.$reset())
watch(() => $store.user, (value) => {
    if (value) useSidebarStore().components.top.push({ component: Avatar })
})
</script>

<template>
    <section v-if="$store.user" id="profile">
        <Info />
        <Images />
    </section>
</template>

<style scoped>
section {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    padding: 30px 25px 30px 10px;

    overflow-x: hidden;
    overflow-y: auto;
}

.block {
    width: 100%;
    background-color: var(--backgroundColor);
    border-radius: 22px;

    padding: 30px;
}

.block:not(:last-of-type) {
    margin-bottom: 23px;
}

section::-webkit-scrollbar {
    height: 10px;
    width: 19px;
}

section::-webkit-scrollbar-track {
    border-radius: 12px;
}

section::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: var(--scroll-color);

    background-clip: content-box;
    border: 6px solid transparent;
}
</style>