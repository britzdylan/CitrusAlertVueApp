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
        type="text"
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
import { useCrypto } from '@/composables/crypto'
import { useStorage } from '@/composables/storage'
import { useApi } from '@/composables/api'
import { useToast } from '@/composables/toast'

const router = useRouter()
const { encrypt } = useCrypto()
const { set } = useStorage()
const { getData } = useApi()
const { alert } = useToast()

const api_key = ref()
const error = ref(false)
const loading = ref(false)

const subTitle = 'Create your account'
const warning =
  'Please note that your API key is top secret and we take extra precautions to keep it safe. Do not share it with anyone.'

const register = async () => {
  loading.value = true
  if (!api_key.value || api_key.value.length < 36) {
    alert('Please enter a valid API key', 'error')
    error.value = true
    loading.value = false
    return
  }
  try {
    const encrypted = await encrypt(api_key.value, import.meta.env.VITE_SECRET)
    await set('api_key', encrypted)
    const { data } = await getData('users/me')
    if (data) {
      router.push('/notifications')
    } else {
      throw new Error('Invalid API key')
    }
    loading.value = false
  } catch (e) {
    // @ts-ignore
    alert(e, 'error')
    loading.value = false
  }
}
</script>

<style scoped></style>
