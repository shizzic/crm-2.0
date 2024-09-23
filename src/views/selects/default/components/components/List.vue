<script setup lang="ts">
import { inject } from 'vue'
import { useStore } from '../../store'

const $store = useStore(inject('$id') as string)()
</script>

<template>
    <ul>
        <li v-for="(li, index) in $store.props.wrapper.list as any" :key="li?.id || index"
            v-show="li && $store.isVisible($store.render(li)) && !$store.isSelected(li, index)"
            @click.stop="$store.selectItem(li, index)">
            <i /> {{ $store.render(li) }}
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
    padding: 8px 20px;
    transition: padding-left .2s ease-out;
}

li:hover {
    padding-left: 30px;
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
    left: 0px;
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