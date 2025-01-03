<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { ComputedRef } from 'vue'
import { useSettingsStore } from '@stores'
import { useStore } from '../../store'
import { $getParsedDate, $img } from '@composables'
import { $getFilter } from '@composables/icon'
import Image from '@views/lib/image/Main.vue'
import Copy from '@views/lib/copy/Main.vue'
import Expander from './Expander.vue'

const lang = useSettingsStore().lang
const $user = useStore().user
const filter = ref('')
const date: ComputedRef<string> = computed(() => $getParsedDate($user?.birthday))
const phone: ComputedRef<string> = computed(() => {
    if ($user?.phones)
        for (const item of $user.phones)
            if (+item.is_main) return item.phoneCode + item.number
    return ''
})

onMounted(() => {
    filter.value = $getFilter(getComputedStyle(document.querySelectorAll('[data-field] h3')?.[0]).getPropertyValue('--color'))
})
</script>

<template>
    <div data-fields-wrapper>
        <div data-divider />

        <div data-fields>
            <div data-field>
                <Image :src="$img('/lib/email.webp')" />
                <h3 v-text="lang.profile.edit.email.title + ':'" />
                <span data-field-value v-text="$user?.email" />
                <Copy :text="$user?.email" />
            </div>

            <div data-field>
                <Image :src="$img('/lib/phone.webp')" />
                <h3 v-text="lang.profile.edit.phones.title + ':'" />
                <span data-field-value v-text="phone" />
                <Copy :text="phone" />
            </div>

            <div v-if="useStore().$fields.expand">
                <div data-field>
                    <Image :src="$img('/lib/calendar.webp')" />
                    <h3 v-text="lang.table.birthday + ':'" />
                    <span data-field-value v-text="date" />
                </div>

                <div data-field>
                    <Image :src="$img('/lib/gender.webp')" />
                    <h3 v-text="lang.table.male + ':'" />
                    <span data-field-value
                        v-text="$user?.male !== null ? ($user?.male ? lang.other.man : lang.other.woman) : ''" />
                </div>

                <div data-field>
                    <Image :src="$img('/lib/location.webp')" />
                    <h3 v-text="lang.profile.edit.birth_place.title + ':'" />
                    <span data-field-value v-text="$user?.birth_place" />
                </div>

                <div data-field>
                    <Image :src="$img('/lib/location.webp')" />
                    <h3 v-text="lang.profile.current_place + ':'" />
                    <span data-field-value>
                        <span v-if="$user?.country" v-text="$user?.country.title" data-field-value />
                        <span v-if="$user?.region" v-text="', ' + $user?.region.title" data-field-value />
                        <span v-if="$user?.city" v-text="', ' + $user?.city.title" data-field-value />
                    </span>
                </div>

                <div data-field>
                    <Image :src="$img('/lib/company.webp')" />
                    <h3 v-text="lang.profile.edit.companies.title + ':'" />
                    <span v-if="$user?.companies" data-field-value>
                        <span v-for="(agency, index) in $user.companies" :key="agency.id" data-field-value
                            v-text="agency.title + ((index + 1) === $user.companies.length ? '' : ', ')" />
                    </span>
                </div>
            </div>
        </div>

        <Expander />
    </div>
</template>

<style scoped>
[data-fields-wrapper] {
    position: relative;
}

[data-divider] {
    width: 55%;
    height: 1.5px;
    background-color: var(--backgroundColor);

    margin-bottom: 25rem;
}

[data-fields] {
    display: flex;
    flex-direction: column;
}

[data-field] {
    width: 100%;
    display: flex;
    align-items: center;
}

[data-field]:not(:last-of-type) {
    margin-bottom: 15rem;
}

[data-field] h3 {
    user-select: none;
    font-size: 20rem;
    font-weight: 600;
    color: var(--color);

    margin-right: 5rem;
}

[data-field-value] {
    font-size: 20rem;
    font-weight: 600;
    color: var(--color);
}

[data-field] img {
    user-select: none;
    width: 24rem;
    filter: v-bind('filter');

    margin-right: 10rem;
}
</style>