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
import { useRoute } from 'vue-router'
import { usePopup } from '@/composables/popup'
const { popup } = usePopup()
const route = useRoute()
</script>

<style scoped></style>
