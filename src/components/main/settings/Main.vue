<script setup lang="ts">
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useSettingsStore } from '@stores'
import { useStore } from './store'
import Search from './Search.vue'
import Expand from '@views/lib/expand/Main.vue'
import Item from './Item.vue'
import Language from './components/Language.vue'
import Size from './components/Size.vue'
import Theme from './components/Theme.vue'

const $settings = useSettingsStore()
const $store = useStore()
const searchPattern: ComputedRef<RegExp> = computed(() => new RegExp($store.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'imu'))
</script>

<template>
    <section>
        <div data-hat>
            <Search />
            <Expand />
        </div>

        <div data-title-wrapper>
            <h2 v-text="$settings.lang?.settings?.title" />
            <span data-description v-text="$settings.lang?.settings?.description" />
        </div>

        <div data-items>
            <Item
                v-show="searchPattern.test($settings.lang?.settings?.lang?.title) || searchPattern.test($settings.lang?.settings?.lang?.description)"
                :title="$settings.lang?.settings?.lang?.title"
                :description="$settings.lang?.settings?.lang?.description">
                <Language />
            </Item>
            <Item
                v-show="searchPattern.test($settings.lang?.settings?.zoom?.title) || searchPattern.test($settings.lang?.settings?.zoom?.description)"
                :title="$settings.lang?.settings?.zoom?.title"
                :description="$settings.lang?.settings?.zoom?.description">
                <Size />
            </Item>
            <Item
                v-show="searchPattern.test($settings.lang?.settings?.theme?.title) || searchPattern.test($settings.lang?.settings?.theme?.description)"
                :title="$settings.lang?.settings?.theme?.title"
                :description="$settings.lang?.settings?.theme?.description">
                <Theme />
            </Item>
        </div>
    </section>
</template>

<style scoped>
section {
    width: 100%;
    height: 100%;
    background-color: var(--color-1);

    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    /* box-shadow: 0 3px 19px 0 rgba(196, 196, 196, 0.45); */
    /* box-shadow: 0 3px 19px 0 var(--color-2); */

    display: flex;
    flex-direction: column;
    padding: 25px;
}

[data-hat] {
    width: 100%;
    height: max-content;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

[data-title-wrapper] {
    width: 100%;

    display: flex;
    flex-direction: column;
    margin: 40rem 0;
}

h2 {
    font-size: 28.73rem;
    font-weight: 700;
    color: var(--color-6);

    margin-bottom: 8rem;
}

[data-description] {
    font-size: 12.23rem;
    font-weight: 600;
    color: var(--color-3);
}

[data-items] {
    width: 100%;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: stretch;
}
</style>