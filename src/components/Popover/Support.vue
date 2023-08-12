<template>
  <section class="screen bg-zinc-50 gap-3 fixed top-0 right-0 left-0 bottom-0 z-50">
    <Button
      @click="closePopup"
      class="btn btn-large btn-min text-black absolute right-2 top-6 z-10"
    >
      <svg width="24" height="24">
        <use xlink:href="/tabler-sprite.svg#tabler-x" />
      </svg>
    </Button>
    <header class="relative gap-4 flex items-center w-full h-20">
      <p class="text-body-lg font-bold">Support Centre</p>
    </header>
    <AccordionItem v-for="item in faqs" v-bind:accordion="item" />
    <header class="relative gap-4 flex items-center w-full mt-8">
      <p class="text-body font-bold">Get in touch</p>
    </header>
    <section class="w-full">
      <p class="text-body">
        If you have any questions or need help with anything, please contact me at
        <a href="mailto:dylan@blakstdio.com" class="text-primary link justify-start"
          >dylan@blakstdio.com</a
        >
      </p>
    </section>
    <section class="w-full mt-auto">
      <p @click="showPopup('privacy')" class="justify-start w-full mt-auto text-xs text-center">Privacy Policy</p>
    </section>
  </section>
</template>

<script setup lang="ts">
import { usePopup } from '@/composables/popup'
const { closePopup, showPopup } = usePopup()

const faqs = [
  {
    title: 'How do I get my LemonSqueezy API key?',
    body: "To get your LemonSqueezy API key, you need to log into your LemonSqueezy account. Navigate to the 'Settings' section, then click on 'API'. There, you will find your API key. If you can't see it, you may need to generate a new one by clicking on 'Generate New API Key'. Remember to keep your API key secure as it provides access to your LemonSqueezy account."
  },
  {
    title: 'Does it track sales across all stores?',
    body: 'Yes, our app tracks sales across all your stores linked to your LemonSqueezy account. As long as the store is connected to your LemonSqueezy account, any sales made will be tracked and you will receive a push notification for each sale.'
  },
  {
    title: 'I am no longer receiving push notifications, what should I do?',
    body: "If you're not receiving push notifications, first check your device's settings to ensure that notifications for the app are allowed. If you're still not receiving notifications, try logging out and logging back into the app. If the problem persists, please contact our support team for further assistance."
  }
]
</script>

<style scoped></style>
