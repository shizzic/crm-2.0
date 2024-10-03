<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { fetcher } from '@composables/fetcher'
import { useRoute } from 'vue-router'
import { useStore } from './store'
import { $setComponentStyle } from '@/assets/composables/theme'
import Info from './components/info/Main.vue'
import Images from './components/images/Main.vue'

$setComponentStyle('profile')
const $store = useStore()
fetcher.get('user/user/get-profile?target_id=' + useRoute().query.id)
    .then((r: any) => {
        $store.user = r?.data?.user
        $store.roles = r?.data?.roles
    })
onBeforeUnmount(() => $store.$reset())
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
</style>