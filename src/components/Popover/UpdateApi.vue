<template>
  <Confirm
    title="Update your API key"
    description="Your API key will be updated and all of your data refreshed."
  >
    <div class="flex flex-col gap-2">
      <Input v-model="api_key" placeholder="Enter your API key" type="text" />
      <Button
        :error="error"
        @click="register()"
        :loading="loading"
        class="btn btn-primary w-full"
        >Save Change</Button
      >
    </div>
  </Confirm>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { usePopup } from '@/composables/popup'
import { ref } from 'vue'
import { useToast } from '@/composables/toast'
import { useCitrus } from '@/composables/citrus'

const { showToast } = useToast()
const router = useRouter()
const route = useRoute()
const { closePopup } = usePopup()
const { testKey } = useCitrus()

const api_key = ref(import.meta.env.VITE_API_KEY)
const loading = ref(false)
const error = ref(false)
const emits = defineEmits(['update', 'close'])

const submit = (t: 'close' | 'update') => {
  emits(t)
  closePopup()
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
    closePopup()
  } else {
    error.value = true
    loading.value = false
    showToast('Invalid API key please try again', 'error')
  }
}
</script>

<style scoped></style>
