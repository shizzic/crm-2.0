<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useStore } from '../../store'
import { useSettingsStore } from '@stores'
import { onClickOutside, useDraggable } from '@vueuse/core'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import Popper from '@views/lib/popper/Main.vue'
import Submit from '@views/inputs/submit/Main.vue'
import Cancel from '@views/lib/cancel/Main.vue'

const $store = useStore()
const lang = useSettingsStore().lang
const wrapper = useTemplateRef('wrapper')
const crop = useTemplateRef('cropper')
let closePopper = { content: lang?.other.close }

onClickOutside(wrapper, $store.clearCropper)
const { style } = useDraggable(wrapper, {
    initialValue: { x: Math.round(window.outerWidth * 0.25), y: Math.round(window.outerWidth * 0.08) },
})
const upload = () => {
    if (!crop.value) return
    const { coordinates, canvas } = crop.value.getResult()

    $store.cropper.file ? $store.setFreshAvatar(canvas, $store.cropper.file) : $store.updateAvatar(String($store.cropper.src), coordinates)
}
</script>

<template>
    <div data-root>
        <div data-wrapper ref="wrapper" :style="style" style="position: fixed;">
            <div data-header>
                <h2 v-text="lang?.profile?.cropper?.title" />
                <Popper v-model:props="closePopper">
                    <span data-cancel v-text="'&#128473;'" @click="$store.clearCropper" />
                </Popper>
            </div>
            <div data-main>
                <h3 v-text="lang?.profile?.cropper?.description" />

                <div data-cropper>
                    <cropper :src="$store.cropper.blob" :check-orientation="false" ref="cropper" />
                </div>

                <div id="btns" style="margin-top: 35rem;">
                    <Cancel v-bind="{
                        event: 'default', css: {
                            default: {
                                width: 'max-content',
                                fontSize: '17rem',
                                fontWeight: 600,
                                padding: '15rem 40rem'
                            }
                        }
                    }" style="margin-right: 20px;" @click="$store.clearCropper" />
                    <Submit v-bind="{
                        css: {
                            default: {
                                width: 'max-content',
                                fontSize: '17rem',
                                fontWeight: 600,
                                padding: '15rem 40rem'
                            }
                        }
                    }" @click="upload()" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
[data-root] {
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    position: absolute;
    left: 0;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;
}

[data-wrapper] {
    width: 50%;
    height: 70%;
    background: transparent;
    background-color: #fff;
    border-radius: 14px;

    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
}

[data-header] {
    height: max-content;
    border-bottom: 1.5px solid #C4C4C4;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rem;
}

h2 {
    font-size: 24rem;
    letter-spacing: -0.02em;
    font-weight: 500;
}

[data-cancel] {
    user-select: none;
    cursor: pointer;
    font-size: 20rem;
}

h2,
[data-cancel] {
    color: #252540;
}

[data-main] {
    width: 100%;
    height: 100%;
    max-height: 100%;

    display: flex;
    flex-direction: column;
    padding: 30rem;
}

[data-cropper] {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 100%;
}

h3 {
    font-size: 20rem;
    letter-spacing: -0.02em;
    font-weight: 500;
    text-align: center;

    margin-bottom: 20rem;
}

:deep(.vue-advanced-cropper) {
    height: 100%;
    max-height: 100%;
    min-height: 100%;
    width: 100%;
    min-width: 100%;

    position: absolute;
    left: 0;
    top: 0;
}

:deep(.vue-advanced-cropper__background),
:deep(.vue-advanced-cropper__foreground) {
    height: 50%;
    border: none;
    background-color: gray;
    background-size: 20px;
}

:deep(.vue-advanced-cropper__image) {
    z-index: 2;
    width: max-content;
    min-width: max-content;
}

:deep(.vue-rectangle-stencil) {
    z-index: 3;
}

:deep(.vue-simple-handler) {
    border-radius: 50%;

    padding: 7rem;
}

:deep(.vue-simple-line) {
    border-width: 1px;
    border-color: #fff;
}

#btns {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>