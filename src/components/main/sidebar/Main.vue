<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import { useStore } from './store'
import Resize from './Resize.vue'
import { $removeComponentStyle, $setComponentStyle } from '@/assets/composables/theme';
const Projects = defineAsyncComponent(() => import('./components/Projects.vue'))
const Domains = defineAsyncComponent(() => import('./components/domains/Main.vue'))

const $store = useStore()
const sidebarPadding = computed(() => $store.cssWidth ? 'var(--padding)' : 0)

$removeComponentStyle()
$setComponentStyle(String('profile'))
</script>

<template>
    <aside>
        <div data-components>
            <component v-for="(item, identifier) in $store.components.top" :is="{ ...item.component }"
                :key="item?.component?.__asyncResolved?.__hmrId" :identifier="identifier" :place="'top'" />

            <Projects />
            <Domains />
            <component v-for="(item, identifier) in $store.components.bottom" :is="{ ...item.component }"
                :key="item?.component?.__asyncResolved?.__hmrId" :identifier="identifier" :place="'bottom'" />
        </div>

        <div data-resize-wrapper>
            <Resize />
        </div>
    </aside>
</template>

<style scoped>
aside {
    min-width: var(--sidebar-width);
    width: var(--sidebar-width);
    max-width: var(--sidebar-width);
    height: 100%;

    display: flex;
    justify-content: space-between;
    overflow-y: auto;
    overflow-x: hidden;
    transition: var(--sidebar-width-transition);
}

[data-components] {
    width: 100%;
    height: max-content;

    display: flex;
    flex-direction: column;
    padding: v-bind(sidebarPadding);
}

[data-components]>* {
    margin-bottom: 20rem;
}

[data-components]:last-child {
    margin-bottom: 0;
}

[data-resize-wrapper] {
    position: relative;
}
</style>