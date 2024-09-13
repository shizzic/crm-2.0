<script setup lang="ts">
import type { Props } from '../..'

const props = withDefaults(defineProps<Props>(), {
    label: true,
    labelText: '',
})
const render: (li: any) => any = (li: any) => {
    return props.work.render ? li[props.work.render] : li
}
</script>

<template>
    <ul>
        <li v-for="(li, index) in props.work.list" :key="li.id ? li.id : index">
            <img src="./assets/arrow.webp" loading="eager">
            {{ render(li) }}
        </li>
    </ul>
</template>

<style scoped>
ul {
    width: 100%;
    max-height: 200px;
    list-style: none;
    position: relative;

    overflow-y: auto;
    overflow-x: hidden;
}

li {
    width: 100%;
    min-width: 0;
    position: relative;
    cursor: pointer;
    color: #252540;
    font-size: 18rem;
    font-weight: 600;
    letter-spacing: -0.02em;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    padding: 8px 20px;
    transition: padding-left .2s ease-out;
}

li:hover {
    padding-left: 50px;
}

img {
    width: 40px;
    position: absolute;
    left: -100px;

    transition: left .2s ease-out;
}

li:hover img {
    left: 0;
}
</style>