<script setup lang="ts">
import { inject } from 'vue'
import { useSettingsStore } from '@stores'
import { useStore } from '../../store'
import type { StoreID } from '@types'

const $id = inject('$id') as StoreID
const $store = useStore($id)()
const lang = useSettingsStore().lang
</script>

<template>
    <div data-header>
        <h6 v-text="$store.props?.wrapper.description" />
        <button v-if="!$store.props.hideClear" @click.stop="$store.clearModel($id)" v-text="lang?.other?.clear" />
    </div>
</template>

<style scoped>
[data-header] {
    display: flex;
    justify-content: space-between;
    padding: 15rem 20rem 0;
}

[data-header] h6 {
    color: v-bind('$store.props.css?.wrapper.Header.description.color');
    font-size: calc(v-bind('$store.props.css?.default.fontSize') - 5rem);
    font-weight: 600;

    margin-right: 15rem;
}

[data-header] button {
    cursor: pointer;
    align-self: flex-start;
    color: v-bind('$store.props.css?.wrapper.Header.clear.color');
    font-size: calc(v-bind('$store.props.css?.default.fontSize') - 3rem);
    font-weight: 500;
    outline: none;
    border: none;
    background: none;
}

[data-header] button:hover {
    text-decoration: underline;
}
</style>