<template>
  <Confirm
    title="Update your API key"
    description="Your API key will be updated and all of your data refreshed."
  >
    <div class="flex flex-col gap-2">
      <Input placeholder="Enter your API key" type="password" />
      <button @click="submit('update')" class="btn btn-primary w-full">Save Change</button>
    </div>
  </Confirm>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { usePopup } from '@/composables/popup'

const router = useRouter()
const route = useRoute()
const { closePopup } = usePopup()

const emits = defineEmits(['update', 'close'])

const submit = (t: 'close' | 'update') => {
  emits(t)
  closePopup()
}
</script>

<style scoped></style>
