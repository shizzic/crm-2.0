<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore, useSettingsStore } from '@stores'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import Input from '@views/inputs/default/Main.vue'
import Submit from '@views/inputs/submit/Main.vue'
import Cancel from '@views/lib/cancel/Main.vue'

const lang = useSettingsStore().lang
const form = ref({ email: '' })
const rules = { email: { required, email } }
const v$ = useVuelidate(rules, form)

let props = {
    v: v$,
    name: 'email_for_new_password',
    placeholder: 'E-mail',
    css: { default: { fontSize: '19.75rem' } }
}
</script>

<template>
    <form id="request_password_reset" name="request_password_reset"
        @submit.prevent="useUserStore().request_new_password(v$.$invalid, form.email)">
        <h3>{{ lang?.auth?.request?.title }}</h3>
        <span>{{ lang?.auth?.request?.description }}</span>

        <Input v-model:props="props" v-model:model="form.email" style="margin-top: 20rem;" />

        <div id="btns" style="margin-top: 35rem;">
            <Cancel v-bind="{ event: 'default', css: { default: { width: '100%' } } }" style="margin-right: 20rem;" />
            <Submit v-bind="{ css: { default: { width: '100%', fontWeight: '600' } } }" />
        </div>
    </form>
</template>

<style scoped>
#request_password_reset {
    width: max-content;
    min-width: none;

    display: flex;
    flex-direction: column;
    padding: 40rem;
}

h3 {
    color: #252540;
    font-weight: 700;
    font-size: 32rem;
    letter-spacing: -0.02em;

    margin-bottom: 10rem;
}

span {
    font-size: 14rem;
    color: #4D5DFA;
}

#btns {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>