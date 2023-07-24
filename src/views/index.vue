<template>
  <section class="screen justify-center bg-primary-600">
    <img src="@/assets/logo_white.svg" alt="CitrusAlert" width="200" height="200" />
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
    router.replace('/home')
  }
  if (store.isAuthenticated) {
    router.replace('/sales')
    return
  }
  await store.stopLoading()
})
</script>

<style scoped></style>
