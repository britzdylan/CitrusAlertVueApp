<template>
  <main class="main">
    <Toast />
    <Steps v-if="popup == 'register-steps'" />
    <Support v-if="popup == 'support'" />
    <slot />
  </main>
</template>

<script setup lang="ts">
import { useLemonStore } from '@/stores/lemon'
import { usePopup } from '@/composables/popup'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const { popup } = usePopup()
const store = useLemonStore()
const router = useRouter()

onMounted(async () => {
  await store.startLoading()
  try {
    await store.getAllData()
  } catch (e) {
    console.log(e)
    router.replace('/')
  }
  if (store.isAuthenticated) {
    router.replace('/sales')
    return
  }
  await store.stopLoading()
})
</script>

<style scoped></style>
