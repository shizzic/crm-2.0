<script setup lang="ts">
import { onBeforeMount, computed, watch } from 'vue'
import { useUserStore, useSettingsStore } from '@stores'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()
const $settings = useSettingsStore()
$settings.$persist()

onBeforeMount(() => {
  $settings.get_lang()
  if (!isLoggedIn.value && $route?.name !== 'login') $router.replace({ name: "login" })
})

const isLoggedIn = computed(() => {
  return Boolean(useUserStore().id)
})
watch(isLoggedIn, (value: boolean) => { $router.replace(value ? { name: "home" } : { name: "login" }) })
</script>

<template>
  <RouterView v-if="$settings.lang" />
</template>