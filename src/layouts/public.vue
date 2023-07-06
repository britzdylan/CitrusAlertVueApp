<template>
  <main class="main">
    <Steps v-if="popup == 'register-steps'" />
    <slot />
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const popup = computed(() => route.query.popup)
</script>

<style scoped></style>
