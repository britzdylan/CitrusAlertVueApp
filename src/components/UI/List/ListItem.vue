<template>
  <li>
    <svg width="24" height="24">
      <use :xlink:href="`/tabler-sprite.svg#tabler-${icon}`" />
    </svg>
    <slot />
  </li>
</template>

<script setup lang="ts">
  defineProps({
    icon: {
      type: String,
      default: 'tabler-activity',
    },
  });
</script>

<style scoped></style>
