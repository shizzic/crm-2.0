<script setup lang="ts">
import { inject } from 'vue'

const props: any = inject('$props')
const render: (li: any) => any = (li: any) => {
    return props.value.wrapper.render ? li[props.value.wrapper.render] : li
}
</script>

<template>
    <ul>
        <li v-for="(li, index) in props.wrapper.list" :key="li.id ? li.id : index"
            v-show="props?.wrapper?.isVisible?.(render(li))">
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

    padding-top: 15px;
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
    padding-left: 30px;
}

img {
    width: 35px;
    position: absolute;
    left: -100px;

    transition: left .2s ease-out;
}

li:hover img {
    left: -25px;
}
</style>