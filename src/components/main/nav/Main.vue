<script setup lang="ts">
import { watch, ref, computed, provide } from 'vue'
import { useSettingsStore } from '@stores'
import { useNavStore } from './store'
import { $getFilter } from '@composables/icon'
import { $setComponentStyle } from '@composables/theme'
import Profile from './components/Profile.vue'
import Logout from './components/Logout.vue'
import MenuItem from './components/default/Item.vue'

$setComponentStyle('nav')
const $store = useNavStore()
const filter = ref('')
const align = computed(() => $store.width === $store.minWidth ? 'center' : 'flex-start')

const changeFilter = () => {
    filter.value = $getFilter(getComputedStyle(document.documentElement).getPropertyValue('--color-6'))
}
changeFilter()
watch(() => useSettingsStore().theme, () => {
    setTimeout(() => changeFilter(), 20)
})
provide('align', align)
</script>

<template>
    <nav>
        <Profile />
        <div id="menu">
            <MenuItem v-for="(item, index) in $store.menu" :key="index" v-bind="item" />
        </div>
        <span class="test" @click="$store.changeNavWidth()">some</span>
        <Logout />
    </nav>
</template>

<style scoped>
nav {
    min-width: v-bind("`${$store.width}rem`");
    max-width: v-bind("`${$store.width}rem`");
    width: v-bind("`${$store.width}rem`");
    height: 100%;
    background-color: var(--color-1);
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    user-select: none;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
    align-items: v-bind(align);
    justify-content: flex-start;
    padding: 20rem 13rem;

    overflow-y: auto;
    overflow-x: hidden;
    transition: all .2s ease-out;
}

#menu {
    width: 100%;
    height: 100%;

    padding: 20rem 0;
    overflow: auto;
}

.router {
    cursor: pointer;
    align-self: flex-start;
    width: 100%;
    background-color: transparent;

    display: flex;
    align-items: center;
    justify-content: v-bind(align);
}

img {
    filter: v-bind(filter);
}

.test {
    margin-bottom: 30px;
    color: var(--color-6);
}
</style>