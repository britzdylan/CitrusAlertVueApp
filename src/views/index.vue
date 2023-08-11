<template>
  <section class="screen justify-center">
    <img src="@/assets/logo.svg" alt="CitrusAlert" width="200" height="200" />
  </section>
</template>

<script setup lang="ts">
import { useLemonStore } from '@/stores/lemon'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const store = useLemonStore()
const router = useRouter()

onMounted(async () => {
  await store.startLoading()
  try {
    await store.getAllData()
  } catch (e) {
    console.log(e)
    router.replace('/welcome')
  }
  if (store.isAuthenticated) {
    router.replace('/dashboard')
    return
  }
  await store.stopLoading()
})
</script>

<style scoped></style>
