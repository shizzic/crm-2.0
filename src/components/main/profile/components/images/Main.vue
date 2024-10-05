<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from '@stores'
import { useStore } from '../../store'
import Photos from './Photos.vue'

const lang = useSettingsStore().lang
const images = computed(() => useStore().user?.images)
const hasImages = computed(() => images.value?.length)
</script>

<template>
    <div class="block">
        <h2>
            {{ hasImages ? lang.profile.images : lang.profile['no-images'] }}
            <span v-show="hasImages" data-quantity v-text="images?.length" />
        </h2>

        <Photos />
    </div>
</template>

<style scoped>
.block {
    padding-bottom: 5px !important;
}

h2,
h2>* {
    font-weight: 600;
    font-size: 24rem;
    letter-spacing: -0.02em;
    color: var(--color-6);
}

[data-quantity] {
    color: var(--color-5);
}
</style>