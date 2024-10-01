<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { useSettingsStore, useUserStore } from '@stores'
import { getFilter } from '@composables/icon'
import Poppers from '@views/lib/popper/Main.vue'
import Image from '@views/lib/image/Main.vue'
import { $img } from '@composables'

const filter = ref('')
const changeFilter = () => {
    filter.value = getFilter(getComputedStyle(document.documentElement).getPropertyValue('--color-6'))
}
changeFilter()
watch(() => useSettingsStore().theme, () => {
    setTimeout(() => changeFilter(), 20)
})
const props = computed(() => {
    return {
        content: useSettingsStore().lang?.other?.logout
    }
})
</script>

<template>
    <nav>
        <RouterLink v-once class="router" id="profile_circle" :to="{ name: 'home' }">
            <Image :src="$img(String(useUserStore().avatar), 'user/user')" />
        </RouterLink>

        <Poppers v-model:props="props">
            <div v-once class="router" id="logout" @click="useUserStore().logout()">
                <img src="@assets/images/nav/logout.webp">
            </div>
        </Poppers>
    </nav>
</template>

<style scoped>
nav {
    min-width: 82px;
    max-width: 82px;
    height: 100%;
    background-color: var(--color-1);
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    user-select: none;

    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: center;
    padding: 20px 15px;

    overflow-x: hidden;
}

.router {
    width: 100%;
    min-width: 100%;
    min-height: 1px;
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

#profile_circle {
    width: 100%;
    height: 50px;
    border: 2px solid var(--color-5);
    background-color: none;
    align-self: flex-start;

    display: flex;
    align-items: center;
    justify-content: center;
}

#profile_circle img {
    width: 100%;
    filter: none;
}

#logout {
    background-color: none;
    align-self: flex-end;
}
</style>