<template>
  <button :disabled="disabled || loading" class="btn">
    <svg v-if="iconLeft" class="absolute left-1 top-6 bottom-1" width="36" height="36">
      <use :xlink:href="`/tabler-sprite.svg#tabler-${loading ? 'loader' : iconLeft}`" />
    </svg>
    <slot />
    <svg v-if="iconRight" class="absolute left-1 top-6 bottom-1" width="36" height="36">
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
