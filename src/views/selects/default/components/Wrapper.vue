<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import { DefaultCSS } from '..'
import type { CSS } from '@types'
import { $merge } from '@/assets/composables'
import vClickOutside from '@/views/other/vClickOutside'
import { emitter as cancel } from '@/views/other/cancel'
import Modal from '@views/modal/default/Main.vue'
import Header from './components/Header.vue'
import Search from './components/Search.vue'
import Selected from './components/Selected.vue'
import List from './components/List.vue'

const props: any = inject('$props')
const css: Ref<CSS> = ref($merge(DefaultCSS, props.css))
const search = ref('')
const isVisible = (li: any) => {
    const pattern = new RegExp(search.value, props.value.wrapper.flags)
    return pattern.test(li)
}
props.value.wrapper.isVisible = isVisible
</script>

<template>
    <div>
        <Transition name="slide-up" mode="out-in">
            <div v-show="props.active" data-select v-click-outside="() => cancel.emit('close_select')">
                <Header />
                <Search v-model="search" />
                <Selected v-if="props.multiple" />
                <List v-if="props?.wrapper?.list" />
            </div>
        </Transition>

        <Modal v-show="props.active" />
    </div>
</template>

<style scoped>
[data-select] {
    z-index: 2;
    position: relative;
    width: 100%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: #F9F9F9;

    display: flex;
    flex-direction: column;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all .15s ease-out;
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