<template>
  <section class=""></section>
</template>

<script setup lang="ts">
import { useLemonStore } from '@/stores/lemon'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { SplashScreen } from '@capacitor/splash-screen'
const store = useLemonStore()
const router = useRouter()

onMounted(async () => {
  await store.startLoading()
  try {
    await store.getAllData()
  } catch (e) {
    console.log(e)
    await SplashScreen.hide()
    router.replace('/welcome')
  }
  if (store.isAuthenticated) {
    await SplashScreen.hide()
    router.replace('/dashboard')
    return
  }
  await SplashScreen.hide()
  await store.stopLoading()
})
</script>

<style scoped></style>
