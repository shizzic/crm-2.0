import { ref } from 'vue'

export const $server = ref(
  new EventSource(
    'https://' + import.meta.env.VITE_API_DOMAIN_NAME + ':' + import.meta.env.VITE_SSE_PORT,
    {
      withCredentials: true
    }
  )
)
