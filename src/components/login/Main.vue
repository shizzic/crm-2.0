<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore, useSettingsStore } from '@stores'
import { useVuelidate } from '@vuelidate/core'
import { required, requiredIf, email, minLength, maxLength, helpers } from '@vuelidate/validators'
import { phone, password } from '@patterns'
import { emitter as cancel } from '@/views/lib/cancel'
import { $img } from '@composables'
import Input from '@views/inputs/default/Main.vue'
import Submit from '@views/inputs/submit/Main.vue'
import Modal from '@views/modal/default/Main.vue'
import RequestNewPassword from './RequestNewPassword.vue'
import Image from '@views/lib/image/Main.vue'

const lang = useSettingsStore().lang
const form = ref({
    phone: '',
    email: '',
    password: '',
})
const rules = {
    phone: {
        required: requiredIf(() => form.value.email.length === 0),
        phone: helpers.withParams({ pattern: phone }, helpers.regex(new RegExp(phone)))
    },
    email: {
        required: requiredIf(() => form.value.phone.length === 0),
        email,
    },
    password: {
        required,
        min: minLength(8),
        max: maxLength(16),
        no_spaces: helpers.withParams({ pattern: password }, helpers.regex(new RegExp(password))),
    },
}
const v$ = useVuelidate(rules, form)
const input_css = {
    default: {
        fontSize: '19.75rem',
        padding: '10rem 21rem',
    },
}
const isRequestPassword = ref(false)
let phoneV = v$.value.phone
let phoneProps = {
    name: 'phone',
    type: 'tel',
    placeholder: lang?.auth?.number,
    autocomplete: 'tel',
    autocorrect: 'on',

    css: input_css,
}
let emailV = v$.value.email
let emailProps = {
    name: 'email',
    type: 'email',
    placeholder: 'E-mail',
    autocomplete: 'username email',

    css: input_css,
}
let passwordV = v$.value.password
const isShowPassword = ref(false)
const passwordProps = computed(() => {
    return {
        name: 'password',
        type: isShowPassword.value ? 'text' : 'password',
        placeholder: lang?.auth?.password,
        minlength: 8,
        maxlength: 16,
        id: 'current-password',
        autocomplete: 'current-password',

        css: input_css,
    }
})

cancel.on("default", () => isRequestPassword.value = false)
</script>

<template>
    <section>
        <form id="login" name="login" autocomplete="on" action=""
            @submit.prevent="useUserStore().login(v$.$invalid, form)">
            <h2 v-html="lang.auth?.title" />
            <h4 v-html="lang.auth?.welcome" />

            <KeepAlive>
                <Input v-if="form.email.length === 0" v-model:model="form.phone" v-model:props="phoneProps"
                    v-model:v="phoneV" class="item" />
            </KeepAlive>
            <KeepAlive>
                <Input v-if="form.phone.length === 0" v-model:model="form.email" v-model:props="emailProps"
                    v-model:v="emailV" class="item" />
            </KeepAlive>
            <div data-password>
                <Input v-model:model="form.password" v-model:props="passwordProps" v-model:v="passwordV" class="item" />
                <Image :src="$img(`/login/${isShowPassword ? 'show_password' : 'hide_password'}.webp`)"
                    @click="isShowPassword = !isShowPassword" :key="String(isShowPassword)" />
            </div>

            <span @click.stop="isRequestPassword = true" style="margin-top: -20rem;">{{ lang?.auth?.forgot }}</span>
            <Modal v-if="isRequestPassword">
                <RequestNewPassword />
            </Modal>

            <Submit v-bind="{
                text: lang?.auth?.submit,
                css: {
                    default: {
                        width: '100%',
                        backgroundColor: '#4D5DFA',
                        fontSize: '19.75rem',

                        padding: '10rem 21rem',
                        margin: '35rem 0 0',
                    },
                }
            }" />
        </form>
    </section>
</template>

<style scoped>
section {
    width: 100%;
    height: 100%;
    background: url('@assets/images/login/guy.webp') left no-repeat, url('@assets/images/login/background.webp') right no-repeat;

    display: flex;
    justify-content: center;
    align-items: center;

    display: flex;
    justify-content: flex-end;
    padding: 5%;
    overflow-y: auto;
    overflow-x: hidden;
}

form {
    width: 33%;
    min-width: 500rem;
    background-color: #fff;
    border-radius: 20px;

    padding: 60rem;
}

@media screen and (max-width: 550px) {
    form {
        width: 100%;
        min-width: 0;

        padding: 40rem;
    }
}

@media screen and (max-width: 360px) {
    form {
        padding: 15rem 20rem;
    }
}

h2 {
    font-weight: 700;
    font-size: 41.88rem;

    margin-bottom: 12rem;
}

h4 {
    color: #252540;
    font-weight: 500;
    font-size: 15.64rem;

    margin-bottom: 50rem;
}

@media screen and (max-width: 360px) {
    h2 {
        font-size: 35rem;

        margin-bottom: 25rem;
    }
}

.item {
    margin-bottom: 25rem;
}

span {
    cursor: pointer;
    font-weight: 500;
    font-size: 12rem;
    letter-spacing: -0.02em;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    text-align: right;
    color: #252540;

    float: right;
}

[data-password] {
    position: relative;
}

[data-password] img {
    position: absolute;
    right: 20rem;
    top: 12rem;

    cursor: pointer;
    width: 24rem;
}
</style>