<template>
  <section class="screen items-start">
    <header class="relative px-4 gap-4 flex items-center justify-center w-full h-20 mb-8">
      <svg class="absolute left-1 top-6 bottom-1" @click="router.back()" width="36" height="36">
        <use xlink:href="/tabler-sprite.svg#tabler-chevron-left" />
      </svg>
      <p class="text-body-lg font-bold text-center mx-auto">
        {{ subTitle }}
      </p>
    </header>
    <form>
      <Input
        v-model="api_key"
        label="Your Lemon Squeezy API key"
        type="password"
        class="items-start mt-8 mx-auto w-full"
        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
        :helper="warning"
        :state="error ? 'error' : ''"
        :disabled="loading"
      />
    </form>

    <Footer>
      <SupportLink class="text-center mx-auto mb-8" />
      <Button :loading="loading" @click="register" class="btn-primary w-full">Submit</Button>
    </Footer>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const api_key = ref('')
const subTitle = 'Create your account'
const warning =
  'Please note that your API key is top secret and we take extra precautions to keep it safe. Do not share it with anyone.'
const error = ref(false)
const loading = ref(false)

const register = () => {
  loading.value = true
  if (!api_key.value || api_key.value.length < 36) {
    error.value = true
    loading.value = false
    return
  }
  // TODO
  // encrypt API key
  // save api key to local storage
  // add api key to axios header
  // run setup function
}
</script>

<style scoped></style>
