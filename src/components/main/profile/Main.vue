<script setup lang="ts">
import { onBeforeUnmount, onBeforeMount } from 'vue'
import { fetcher } from '@composables/fetcher'
import { useRoute } from 'vue-router'
import { useStore } from './store'
import { useSidebarStore } from '@stores'
import Info from './components/info/Main.vue'
import Images from './components/images/Main.vue'
import Avatar from './components/avatar/Main.vue'

const $store = useStore()
fetcher.get('user/user/get-profile?target_id=' + useRoute().query.id)
    .then((r: any) => {
        if (r?.data?.user && r.data.user.avatar === '/no-photo.webp') r.data.user.avatar = undefined
        $store.user = r?.data?.user
        $store.roles = r?.data?.roles
    })

onBeforeUnmount(() => {
    $store.$reset()
})
onBeforeMount(() => {
    useSidebarStore().components.add({ component: Avatar }, 'top')
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
    padding: 30rem 25rem 30rem 10rem;

    overflow-x: hidden;
    overflow-y: auto;
}

.block {
    width: 100%;
    background-color: var(--backgroundColor);
    border-radius: 22px;

    padding: 30rem;
    overflow: hidden;
}

.block:not(:last-of-type) {
    margin-bottom: 23px;
}

section::-webkit-scrollbar {
    height: 10rem;
    width: 19rem;
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