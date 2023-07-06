<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="main">
    <component :is="$route.meta.Layout">
      <RouterView />
    </component>
  </div>
</template>

<style scoped></style>
