<template>
  <button :disabled="disabled" :class="loading ? 'pointer-events-none' : ''" class="btn">
    <svg v-if="iconLeft || loading" :class="loading ? 'animate-spin' : ''">
      <use :xlink:href="`/tabler-sprite.svg#tabler-${loading ? 'loader' : iconLeft}`" />
    </svg>
    <slot v-if="!loading" />
    <p v-else>Please be patient...</p>
    <svg v-if="iconRight">
      <use :xlink:href="`/tabler-sprite.svg#tabler-${iconRight}`" />
    </svg>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  iconLeft?: string
  iconRight?: string
  disabled?: boolean
  loading?: boolean
}>()
</script>

<style scoped></style>
