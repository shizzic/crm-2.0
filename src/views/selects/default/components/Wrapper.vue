<script setup lang="ts">
import { inject, watch, ref, useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'
import Modal from '@views/modal/default/Main.vue'
import Header from './components/Header.vue'
import Search from './components/Search.vue'
import Selected from './components/Selected.vue'
import List from './components/List.vue'
import { useStore } from '../store'

const $store = useStore(inject('$id') as string)()
const wasOpenedFirstTime = ref(false) // срабатывает ровно 1 раз, чтобы не перерендеривать компоненты каждый раз при открытии
const wrapper = useTemplateRef('wrapper')

// использую any, потому что иначе EventTarget type не видет ключа id, хотя он там по факту есть :D
onClickOutside(wrapper, (e: any) => {
    if (e?.target?.id === 'modal')
        $store.props.active = false
})
watch(() => $store.props?.active, (value) => (wasOpenedFirstTime.value = Boolean(value)), { once: true })
</script>

<template>
    <div v-show="$store.props.active">
        <Modal v-if="wasOpenedFirstTime" :style="{ zIndex: Number($store.props.css?.default.zIndex) + 1 }" />

        <Transition name="slide-up" mode="out-in">
            <div v-if="wasOpenedFirstTime" data-select data-select-active="$store.props.active" ref="wrapper"
                :style="{ zIndex: Number($store.props.css?.default.zIndex) + 2 }">
                <Header v-if="$store.props.wrapper.description || !$store.props.hideClear" />
                <Search v-if="$store.props.active" />
                <Selected v-if="$store.props.multiple" />
                <List v-if="$store.props.wrapper.list" />
            </div>
        </Transition>
    </div>
</template>

<style scoped>
[data-select] {
    position: v-bind('$store.props.css?.wrapper.position');
    width: 100%;

    border-bottom-left-radius: v-bind('$store.props.css?.default.borderRadius');
    border-bottom-right-radius: v-bind('$store.props.css?.default.borderRadius');
    background-color: v-bind('$store.props.css?.wrapper.backgroundColor');

    display: flex;
    flex-direction: column;
}

[data-select-active] {
    border: v-bind('$store.props.css?.default.border');
    border-color: v-bind('$store.props.css?.default.borderColor');
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all .2s ease-out;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(50px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}
</style>