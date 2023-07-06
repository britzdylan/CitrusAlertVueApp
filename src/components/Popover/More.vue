<template>
  <div
    class="bg-primary-600 py-8 px-4 gap-4 text-white flex flex-col fixed top-0 left-0 right-0 bottom-0 items-center justify-end z-50"
  >
    <button @click="closePopup" class="btn btn-large btn-min text-white absolute top-2 right-2">
      <svg width="24" height="24">
        <use xlink:href="/tabler-sprite.svg#tabler-x" />
      </svg>
    </button>
    <img class="w-32 h-32" src="@/assets/logo_white.svg" />
    <a
      href="/"
      target="_blank"
      class="mb-auto flex items-center gap-3 justify-center w-full text-2xl"
    >
      <p>Follow us on</p>
      <svg width="24" height="24">
        <use xlink:href="/tabler-sprite.svg#tabler-brand-twitter" />
      </svg>
    </a>
    <SupportLink class="text-white" />
    <small>Please rate our app</small>
  </div>
</template>

<script setup lang="ts">
import { usePopup } from '@/composables/popup'
const { closePopup } = usePopup()
</script>

<style scoped></style>
