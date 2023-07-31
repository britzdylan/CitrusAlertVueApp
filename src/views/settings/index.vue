<template>
  <section class="screen gap-3 relative">
    <header class="relative px-4 gap-4 flex items-center justify-center w-full h-20">
      <p v class="text-body-lg font-bold text-center mx-auto">Account Settings</p>
    </header>
    <Input
      v-model="key"
      disabled
      label="Manage Your LemonSqueezy API key"
      type="password"
      class="items-start mx-auto w-full"
      helper="Your API key is top secret and we take extra precautions to keep it safe. Do not share it with anyone."
      placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
    />
    <Footer class="mt-auto !static w-full !p-0 !pb-4">
      <Button @click="showPopup('update-api')" class="btn btn-primary w-full">
        Update my API key
      </Button>
    </Footer>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePopup } from '@/composables/popup'
const { showPopup } = usePopup()
const isNotificationEnabled = ref(false)
const key = ref('&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;')
</script>

<style scoped></style>
