<template>
  <section class="screen gap-3 relative">
    <header class="relative gap-4 flex items-end w-full h-20">
      <p class="text-body-xl font-bold">Account Settings</p>
    </header>
    <section class="w-full flex flex-col gap-4">
      <div class="flex items-center justify-between gap-1 border-b pb-1 border-zinc-200">
        <div class="flex flex-col gap-1 col-span-4">
          <p class="text-body-sm font-bold">Update Lemon Squeezy API key</p>
          <p class="text-xs font-light">
            Please note that your API key is top secret and we take extra precautions to keep it
            safe. Do not share it with anyone.
          </p>
        </div>
        <Button
          @click="showPopup('update-api')"
          class="btn-text btn-text-tertiary text-xs !p-1 !gap-0"
          >More
        </Button>
      </div>
      <!-- Delete Acount -->
      <div class="flex items-center justify-between gap-1 border-b pb-1 border-zinc-200">
        <div class="flex flex-col gap-1 col-span-4">
          <p class="text-body-sm font-bold">Clear Data & Delete Account</p>
          <p class="text-xs font-light">
            Please note that this action is irreversible and will delete all your data from our
            servers.
          </p>
        </div>
        <Button @click="deleteAccount" class="btn-text btn-text-tertiary text-xs !p-1 !gap-0"
          >More
        </Button>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePopup } from '@/composables/popup'
const { showPopup } = usePopup()
const deleteAccount = () => {
  showPopup('delete-account')
}
</script>

<style scoped></style>
