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
import FireUser from '@/models/user'
import { useToast } from '@/composables/toast'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/api'
import { useCrypto } from '@/composables/crypto'

const { encrypt } = useCrypto()
const { testApiKey } = useApi()
const router = useRouter()

const { showToast } = useToast()
// TODO fix this
const api_key = ref(import.meta.env.VITE_API_KEY || '')
const error = ref(false)
const loading = ref(false)

const subTitle = 'Create your account'
const warning =
  'Please note that your API key is top secret and we take extra precautions to keep it safe. Do not share it with anyone.'

const testKey = async (api_key: string) => {
  try {
    const { data } = await testApiKey(api_key)
    if (data) {
      showToast('API Key Verified', 'success')
    } else {
      throw new Error('Invalid API key')
    }
    const encrypted = await encrypt(api_key, import.meta.env.VITE_SECRET)
    let user = await FireUser.init({ id: Number(data.id), api_key: encrypted })
    await user.save()
    return true
  } catch (e) {
    console.log(e)
    // @ts-ignore
    return false
  }
}

const register = async () => {
  loading.value = true
  if (!api_key.value || api_key.value.length < 36) {
    showToast('Please enter a valid API key', 'error')
    error.value = true
    loading.value = false
    return
  }
  let result = await testKey(api_key.value)
  if (result) {
    setTimeout(() => {
      router.replace('/notifications')
    }, 1000)
  } else {
    error.value = true
    loading.value = false
    showToast('Invalid API key please try again', 'error')
  }
}
</script>

<style scoped></style>
