<template>
  <span class="pill">
    <svg v-if="statusIcon" width="24" height="24">
      <use :xlink:href="`/tabler-sprite.svg#${statusIcon}`" />
    </svg>
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  statusIcon: string
}>()
</script>

<style scoped></style>
