<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { DefaultCSS } from '..'
import type { Props } from '..'
import type { CSS } from '@types'
import { $merge } from '@/assets/composables'
import vClickOutside from '@/views/other/vClickOutside'
import { emitter as cancel } from '@/views/other/cancel'
import Modal from '@views/modal/default/Main.vue'
import Header from './components/Header.vue'
import Search from './components/Search.vue'
import Selected from './components/Selected.vue'
import List from './components/List.vue'

const props = withDefaults(defineProps<Props>(), {
    label: true,
    labelText: '',
    css: () => { return {} }
})

const css: Ref<CSS> = ref($merge(DefaultCSS, props.css))
</script>

<template>
    <div>
        <Transition name="slide-up" mode="out-in">
            <div v-show="true" data-select v-click-outside="() => cancel.emit('close_select')">
                <Header />
                <Search />
                <Selected />
                <List v-bind="props" :css="css" />
            </div>
        </Transition>

        <!-- <Modal /> -->
    </div>
</template>

<style scoped>
[data-select] {
    z-index: 2;
    position: relative;
    width: 100%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

    background-color: white;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all .1s ease-out;
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