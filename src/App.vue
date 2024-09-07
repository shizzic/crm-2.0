<script setup lang="ts">
import { onBeforeMount, computed, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useSettingsStore } from '@/stores/settings/main'
import { Lang_provide } from '@/assets/symbols'
import type { Lang } from '@/assets/types'

const $route = useRoute()
const $router = useRouter()
const $settings = useSettingsStore()
$settings.$persist()
const languages: Lang = ref({})
const isLoggedIn = computed(() => {
  return useUserStore().id
})

provide(Lang_provide, computed(() => languages.value[$settings.locale]))
onBeforeMount(() => {
  if (!isLoggedIn.value && $route?.name !== 'login') $router.replace({ name: "login" })
  $settings.get_lang(languages)
})
</script>

<template>
  <RouterView v-if="languages[$settings.locale]" />
</template>