<script setup lang="ts">
import { watch, ref, computed, provide, onBeforeUnmount } from 'vue'
import { useSettingsStore, useAccessStore } from '@stores'
import { useNavStore } from './store'
import { $getFilter } from '@composables/icon'
import { $setComponentStyle } from '@composables/theme'
import { dragscroll as vDragscroll } from 'vue-dragscroll'
import { setTimeout } from 'worker-timers'
import Profile from './components/Profile.vue'
import Logout from './components/Logout.vue'
import MenuItem from './components/default/Item.vue'
import Expand from './components/Expand.vue'

useAccessStore().setUpdater()
$setComponentStyle('nav')
const $store = useNavStore()
const filter = ref('')
const align = computed(() => $store.width === $store.minWidth ? 'center' : 'flex-start')
const isDragging = ref(false)

const changeFilter = () => {
    filter.value = $getFilter(getComputedStyle(document.documentElement).getPropertyValue('--color-6'))
}
changeFilter()
watch(() => useSettingsStore().theme, () => {
    setTimeout(() => changeFilter(), 20)
})
provide('align', align)
onBeforeUnmount(() => useAccessStore().clearUpdater())
</script>

<template>
    <nav>
        <Profile />
        <div id="menu" v-dragscroll.y="true" :data-menu-grabbing="isDragging" @dragscrollstart="isDragging = true"
            @dragscrollend="isDragging = false" :style="{ 'pointer-events': isDragging ? 'none' : 'auto' }">
            <template v-for="(item, index) in $store.menu" :key="index">
                <MenuItem v-if="$store.isDeeper(item)" v-bind="item" :disabled="isDragging" />
            </template>
        </div>

        <div style="margin-top: auto;">
            <Expand v-once />
            <Logout v-once />
        </div>
    </nav>
</template>

<style scoped>
nav {
    min-width: v-bind("`${$store.width}rem`");
    max-width: v-bind("`${$store.width}rem`");
    width: v-bind("`${$store.width}rem`");
    background-color: var(--color-1);
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.25);
    height: 100%;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    user-select: none;

    display: flex;
    flex-direction: column;
    align-items: v-bind(align);
    justify-content: flex-start;
    padding: 20rem 13rem;

    overflow: hidden;
    transition: all .2s ease-out;
}

#menu {
    width: 100%;
    height: max-content;
    border-radius: 50px;

    margin: 20rem 0;
    overflow-x: hidden;
    overflow-y: auto;
}

[data-menu-grabbing="false"] {
    cursor: grab;
}

[data-menu-grabbing="true"] {
    cursor: grabbing;
}

.router {
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
</style>