<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useSettingsStore, useUserStore } from '@stores'
import { useNavStore } from './store'
import { $getFilter } from '@composables/icon'
import { $setComponentStyle } from '@composables/theme'
import { $img } from '@composables'
import type { Props } from '@views/lib/popper'
import Popper from '@views/lib/popper/Main.vue'
import Image from '@views/lib/image/Main.vue'
import MenuItem from './components/Item.vue'

$setComponentStyle('nav')
const $store = useNavStore()
const filter = ref('')
const changeFilter = () => {
    filter.value = $getFilter(getComputedStyle(document.documentElement).getPropertyValue('--color-6'))
}
changeFilter()
watch(() => useSettingsStore().theme, () => {
    setTimeout(() => changeFilter(), 20)
})

const placement = 'right'
const profile: ComputedRef<Props> = computed(() => {
    return {
        content: useSettingsStore().lang?.nav?.open_profile, placement
    }
})
const logout: ComputedRef<Props> = computed(() => {
    return {
        content: useSettingsStore().lang?.nav?.logout, placement
    }
})
</script>

<template>
    <nav>
        <RouterLink v-once class="router" id="profile_circle"
            :to="{ name: 'profile', query: { id: useUserStore().id } }">
            <Popper v-model:props="profile">
                <Image :src="$img(useUserStore().avatar ?? '/no-photo.webp', 'user/user')"
                    style="border-radius: 50%;" />
            </Popper>
        </RouterLink>

        <div id="menu">
            <MenuItem v-for="(item, index) in $store.menu" :key="index" v-bind="item" class="router" />
        </div>

        <Popper v-model:props="logout">
            <div v-once class="router" id="logout" @click="useUserStore().logout()">
                <Image :src="$img('/nav/logout.webp')" style="border-radius: 0;" />
            </div>
        </Popper>
    </nav>
</template>

<style scoped>
nav {
    min-width: v-bind("`${$store.width}rem`");
    max-width: v-bind("`${$store.width}rem`");
    height: 100%;
    background-color: var(--color-1);
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    user-select: none;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20rem 13rem;

    overflow-y: auto;
    overflow-x: hidden;
}

#menu {
    height: 100%;

    padding: 20rem 0;
    overflow: auto;
}

.router {
    align-self: flex-start;
    cursor: pointer;
    width: 50rem;
    height: 50rem;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
}

img {
    filter: v-bind(filter);
}

#profile_circle {
    background-color: none;
    align-self: flex-start;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 auto;
}

#profile_circle img {
    width: 50rem;
    height: 50rem;
    filter: none;
}

#logout {
    background-color: none;
    justify-self: flex-end;

    margin: 0 auto;
}

#logout img {
    width: 30rem;
    height: 30rem;
}
</style>