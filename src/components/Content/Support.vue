<template>
  <p @click="showSupport" class="flex gap-1 text-xs">
    Need help? Visit our
    <a class="text-xs" href="#">support page</a>
  </p>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const showSupport = () => {
  console.log(route.path)
  router.replace({
    path: route.path,
    query: { popup: 'support' }
  })
}
</script>

<style scoped></style>
