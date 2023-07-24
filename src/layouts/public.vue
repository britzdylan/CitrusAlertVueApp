<template>
  <main class="main">
    <Toast />
    <Steps v-if="popup == 'register-steps'" />
    <Support v-if="popup == 'support'" />
    <slot />
  </main>
</template>

<script setup lang="ts">
import { usePopup } from '@/composables/popup'

const { popup } = usePopup()
</script>

<style scoped></style>
