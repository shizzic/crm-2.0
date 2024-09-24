<script setup lang="ts">
import { inject, watch, ref, useTemplateRef } from 'vue'
import type { Ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { emitter as cancel } from '@/views/lib/cancel'
import Modal from '@views/modal/default/Main.vue'
import Header from './components/Header.vue'
import Search from './components/Search.vue'
import Selected from './components/Selected.vue'
import List from './components/List.vue'
import { useStore } from '../store'

const $store = useStore(inject('$id') as string)()
const wasOpenedFirstTime: Ref<boolean> = ref(false)
watch(() => $store.props?.active, (value) => (wasOpenedFirstTime.value = Boolean(value)), { once: true })

const wrapper = useTemplateRef('wrapper')
onClickOutside(wrapper, () => { if ($store.props.active) cancel.emit('close_select') })
</script>

<template>
    <div>
        <Modal v-if="wasOpenedFirstTime" v-show="$store.props.active"
            :style="{ zIndex: Number($store.props.css?.default.zIndex) + 1 }" />

        <Transition name="slide-up" mode="out-in">
            <div v-if="wasOpenedFirstTime" v-show="$store.props.active" data-select
                data-select-active="$store.props.active" ref="wrapper"
                :style="{ zIndex: Number($store.props.css?.default.zIndex) + 2 }">
                <Header v-if="$store.props.wrapper.description || !$store.props.hideClear" />
                <Search />
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