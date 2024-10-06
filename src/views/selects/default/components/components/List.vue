<script setup lang="ts">
import { inject } from 'vue'
import { useStore } from '../../store'
import { $getDeep } from '@composables'
import type { Index, StoreID } from '@types'

const $id = inject('$id') as StoreID
const $store = useStore($id)()
const isShowable = (li: any, index: Index): boolean => {
    return li
        &&
        $store.isSearched($id, $getDeep(li, $store.props.wrapper.deep || []))
        &&
        !$store.isSelected($id, index)
}
</script>

<template>
    <ul>
        <li v-for="(li, index) in $store.props.wrapper.list as any" :key="li?.id || index"
            v-show="isShowable(li, index)" @click.stop="$store.$select($id, li, index)">
            <i /> {{ $getDeep(li, $store.props.wrapper.deep || []) }}
        </li>
    </ul>
</template>

<style scoped>
ul {
    width: 100%;
    max-height: v-bind('$store.props.css?.wrapper.List.maxHeight');
    list-style: none;
    position: relative;

    overflow-y: auto;
    overflow-x: hidden;
}

li {
    width: 100%;
    position: relative;
    cursor: pointer;
    color: v-bind('$store.props.css?.wrapper.List.color');
    font-size: calc(v-bind('$store.props.css?.default.fontSize') - 3rem);
    font-weight: 600;
    letter-spacing: -0.02em;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    display: flex;
    align-items: center;
    padding: 8rem 20rem;
    transition: padding-left .2s ease-out;
}

li:hover {
    padding-left: 30rem;
}

i {
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-left: 10px solid #4D5DFA;
    border-bottom: 6px solid transparent;

    position: absolute;
    left: -20px;
    transition: left .15s ease-out;
}

li:hover i {
    left: 0;
}

ul::-webkit-scrollbar {
    height: 10px;
    width: 19px;
}

ul::-webkit-scrollbar-track {
    border-radius: 12px;
}

ul::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: #4D5DFA;

    background-clip: content-box;
    border: 6px solid transparent;
}

ul::-webkit-scrollbar-thumb:hover {
    background-color: #8b96ff;
}
</style>