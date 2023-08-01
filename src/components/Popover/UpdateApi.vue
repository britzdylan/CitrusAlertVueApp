<template>
  <Confirm
    showX="true"
    title="Update your API key"
    description="Your API key will be updated and all of your data refreshed."
  >
    <div class="flex flex-col gap-2">
      <TextArea v-model="api_key" placeHolder="Paste your API key here" />
      <Button :error="error" @click="register()" :loading="loading" class="btn btn-primary w-full"
        >Save Change</Button
      >
    </div>
  </Confirm>
</template>

<script setup lang="ts">
import { useRegister } from '@/composables/register'

const { register, loading, error, api_key } = useRegister()
</script>

<style scoped></style>
