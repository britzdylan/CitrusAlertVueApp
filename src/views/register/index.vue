<template>
  <section class="screen items-start">
    <header class="relative px-4 gap-4 flex items-center justify-center w-full h-10 mb-8">
      <svg class="absolute left-1 top-1 bottom-1" @click="router.back()" width="36" height="36">
        <use xlink:href="/tabler-sprite.svg#tabler-chevron-left" />
      </svg>
      <p class="text-body-lg font-bold text-center mx-auto">
        {{ subTitle }}
      </p>
    </header>
    <!-- <div class="flex items-end mx-auto mb-8">
      <img
      v-motion-fade
      :delay="400"
      src="/logo.svg"
      alt="CitrusAlert"
      width="200"
      height="200" />
      <small class="text-zinc-500 text-xs mb-1">V0.1</small>
    </div> -->

    <Input
      v-model="api_key"
      label="Your lemonsqueezy API key"
      type="password"
      class="items-start mt-8 mx-auto w-full"
      placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
    />
    <p class="text-sm mt-4 text-zinc-500">
      {{ warning }}
    </p>
    <Footer>
      <Support class="text-center mx-auto mb-8" />
      <button @click="register" class="btn btn-primary w-full">Submit</button>
    </Footer>
  </section>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { usePopup } from '@/composables/popup'

const { showPopup } = usePopup()
const router = useRouter()
const route = useRoute()
const api_key = ref('')
const subTitle = 'Create your account'
const warning =
  'Please note that your API key is top secret and we take extra precautions to keep it safe. Do not share it with anyone.'

const register = () => {
  console.log(api_key.value)
  showPopup('register-steps')
}
</script>

<style scoped></style>
