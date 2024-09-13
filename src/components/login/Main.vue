<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore, useSettingsStore } from '@stores'
import { useVuelidate } from '@vuelidate/core'
import { required, requiredIf, email, minLength, maxLength, helpers } from '@vuelidate/validators'
import { phone, password } from '@patterns'
import { emitter as cancel } from '@views/other/cancel'
import Input from '@views/inputs/default/Main.vue'
import Submit from '@views/inputs/submit/Main.vue'
import Modal from '@views/modal/default/Main.vue'
import RequestNewPassword from './RequestNewPassword.vue'

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
        padding: '10px 21px',
    },
}
const isRequestPassword = ref(false)
cancel.on("default", () => isRequestPassword.value = false)
</script>

<template>
    <section>
        <form id="login" name="login" autocomplete="on" action=""
            @submit.prevent="useUserStore().login(v$.$invalid, form)">
            <h2 v-html="lang.auth?.title" />
            <h4 v-html="lang.auth?.welcome" />

            <Input v-if="form.email.length === 0" v-model="form.phone" v-bind="{
                v: v$.phone,
                name: 'phone',
                type: 'tel',
                placeholder: lang?.auth?.number,
                autocomplete: 'tel',
                autocorrect: 'on',

                label: false,
                css: input_css,
            }" class="item" />

            <Input v-if="form.phone.length === 0" v-model="form.email" v-bind="{
                v: v$.email,
                name: 'email',
                type: 'email',
                placeholder: 'E-mail',
                autocomplete: 'username email',

                label: false,
                css: input_css,
            }" class="item" />

            <Input v-model="form.password" v-bind="{
                v: v$.password,
                name: 'password',
                type: 'password',
                placeholder: lang?.auth?.password,
                minlength: 8,
                maxlength: 16,
                id: 'current-password',
                autocomplete: 'current-password',

                label: false,
                css: input_css,
            }" />

            <span @click.stop="isRequestPassword = true" style="margin-top: 5px;">{{ lang?.auth?.forgot }}</span>
            <Modal v-if="isRequestPassword">
                <RequestNewPassword />
            </Modal>

            <Submit v-bind="{
                text: lang?.auth?.submit,
                css: {
                    default: {
                        width: '100%',
                        backgroundColor: '#4D5DFA',
                        fontSize: '19.75px',

                        padding: '10px 21px',
                        margin: '35px 0 0',
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
    background: url('/src/assets/images/login/guy.webp') left no-repeat, url('/src/assets/images/login/background.webp') right no-repeat;

    display: flex;
    justify-content: center;
    align-items: center;

    display: flex;
    justify-content: right;
    padding: 5%;
    overflow: auto;
}

form {
    width: 33%;
    min-width: 500px;
    background-color: #fff;
    border-radius: 20px;

    padding: 60px;
}

@media screen and (max-width: 550px) {
    form {
        width: 100%;
        min-width: 0;

        padding: 40px;
    }
}

@media screen and (max-width: 360px) {
    form {
        padding: 15px 20px;
    }
}

h2 {
    font-weight: 700;
    font-size: 41.88rem;

    margin-bottom: 12px;
}

h4 {
    color: #252540;
    font-weight: 500;
    font-size: 15.64rem;

    margin-bottom: 50px;
}

@media screen and (max-width: 360px) {
    h2 {
        font-size: 35rem;

        margin-bottom: 25px;
    }
}

.item:not(:last-of-type) {
    margin-bottom: 25px;
}

.item:last-of-type {
    margin-bottom: 3px;
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
</style>