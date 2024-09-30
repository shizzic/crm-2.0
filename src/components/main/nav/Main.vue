<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { useSettingsStore, useUserStore } from '@stores'
import { getFilter } from '@composables/icon'
import Poppers from '@views/lib/popper/Main.vue'

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