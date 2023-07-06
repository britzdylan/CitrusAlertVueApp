<template>
  <section class="screen bg-zinc-50 gap-3 fixed top-0 right-0 left-0 bottom-0 z-50">
    <button
      @click="closePopup"
      class="btn btn-large btn-min text-black absolute right-2 top-2 z-10"
    >
      <svg width="24" height="24">
        <use xlink:href="/tabler-sprite.svg#tabler-x" />
      </svg>
    </button>
    <header class="relative px-4 gap-4 flex items-center justify-center w-full h-20">
      <p class="text-body-lg font-bold">Support Centre</p>
    </header>
    <UIAccordionItem v-for="item in faqs" v-bind:accordion="item" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePopup } from '@/composables/popup'
const { closePopup } = usePopup()

const faqs = [
  {
    title: 'How do I get started?',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id bibendum sodales, diam magna dictum augue, eget ultricies velit nunc eget dolor. Sed euismod, diam id bibendum sodales, diam magna dictum augue, eget ultricies velit nunc eget dolor.',
    open: true
  }
]
</script>

<style scoped></style>
