<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import type { Props } from '../'
import vClickOutside from '@/views/lib/vClickOutside'
import { emitter as cancel } from '@/views/lib/cancel'
import Modal from '@views/modal/default/Main.vue'
import Header from './components/Header.vue'
import Search from './components/Search.vue'
import Selected from './components/Selected.vue'
import List from './components/List.vue'

const props = inject('$props') as Ref<Props>
const search = ref('')
const isVisible = (render: string): boolean => {
    const pattern = new RegExp(search.value, props.value.wrapper.flags)
    return pattern.test(render)
}
props.value.wrapper.isVisible = isVisible
</script>

<template>
    <div>
        <Modal v-show="props.active" style="z-index: 2" />

        <Transition name="slide-up" mode="out-in">
            <div v-if="props.active" data-select v-click-outside="() => { cancel.emit('close_select') }">
                <Header v-if="props.wrapper.description || !props.hideClear" />
                <Search v-model="search" />
                <Selected v-if="props.multiple" />
                <List v-if="props.wrapper.list" />
            </div>
        </Transition>
    </div>
</template>

<style scoped>
[data-select] {
    z-index: 3;
    position: v-bind('props.css?.wrapper.position');
    width: 100%;

    border-bottom-left-radius: v-bind('props.css?.default.borderRadius');
    border-bottom-right-radius: v-bind('props.css?.default.borderRadius');
    background-color: v-bind('props.css?.wrapper.backgroundColor');

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