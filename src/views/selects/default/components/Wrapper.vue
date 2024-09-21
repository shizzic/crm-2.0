<script setup lang="ts">
import { inject } from 'vue'
import vClickOutside from '@/views/lib/vClickOutside'
import { emitter as cancel } from '@/views/lib/cancel'
import Modal from '@views/modal/default/Main.vue'
import Header from './components/Header.vue'
import Search from './components/Search.vue'
import Selected from './components/Selected.vue'
import List from './components/List.vue'
import { useStore } from '../store'

const $store = useStore(inject('$id') as string)()
</script>

<template>
    <div>
        <Modal v-show="$store.props.active" :style="{ zIndex: Number($store.props.css?.default.zIndex) + 1 }" />

        <Transition name="slide-up" mode="out-in">
            <div v-if="$store.props.active" :style="{ zIndex: Number($store.props.css?.default.zIndex) + 2 }"
                data-select v-click-outside="() => { cancel.emit('close_select') }">
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