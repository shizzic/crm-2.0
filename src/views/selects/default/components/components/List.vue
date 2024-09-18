<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import type { Props } from '../..'
import { emitter as cancel } from '@/views/other/cancel'

const props = inject('$props') as Ref<Props>
const model = inject('$model') as Ref<any>
const render: any = inject('$render')
const isSelected = (li: any): boolean => {
    if (model.value) {
        const str = JSON.stringify(li)

        if (props.value.multiple)
            for (let key in model.value)
                if (str === JSON.stringify(model.value[key]))
                    return true

        if (str === JSON.stringify(model.value)) return true
    }

    return false
}
const click = (li: any): void => {
    model.value = li

    if (!props.value.wrapper.list)
        return

    if (!props.value.multiple)
        cancel.emit('close_select')
    else {
        const length = Array.isArray(props.value.wrapper.list) ? props.value.wrapper.list.length : Object.keys(props.value.wrapper.list).length

        if (model.value && model.value.length === length)
            cancel.emit('close_select')
    }
}
</script>

<template>
    <ul>
        <template v-for="(li, index) in props.wrapper.list as any" :key="li?.id ? li.id : index">
            <li v-if="li && props.wrapper.isVisible(render(li)) && !isSelected(li)" @click.stop="click(li)">
                <i /> {{ render(li) }}
            </li>
        </template>
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
    position: relative;
    cursor: pointer;
    color: v-bind('props.css?.wrapper.List.color');
    font-size: calc(v-bind('props.css?.default.fontSize') - 4rem);
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

li:first-of-type {
    padding-top: 0;
    margin-top: -7px;
}

li:hover {
    padding-left: 30px;
}

i {
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-left: 10px solid #707fff;
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
    background-color: #707fff;

    background-clip: content-box;
    border: 6px solid transparent;
}

ul::-webkit-scrollbar-thumb:hover {
    background-color: #8b96ff;
}
</style>