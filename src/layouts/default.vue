<template>
  <main class="main">
    <Toast />
    <Steps v-if="popup == 'register-steps'" />
    <Confirm v-if="popup == 'confirm'" />
    <UpdateApi v-if="popup == 'update-api'" />
    <More v-if="popup == 'more'" />
    <Support v-if="popup == 'support'" />

    <slot />
    <Navbar />
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLemonStore } from '@/stores/lemon'
import { usePopup } from '@/composables/popup'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const { popup } = usePopup()
const store = useLemonStore()
const { isAuthenticated } = storeToRefs(store)

onMounted(async () => {
  await store.getAllData()
  if (!isAuthenticated) {
    useRouter().push('/register')
  }
})
</script>

<style scoped></style>
