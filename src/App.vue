<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useNotifications } from './composables/notifications'

useNotifications()
</script>

<template>
  <div class="main">
    <component :is="$route.meta.Layout">
      <RouterView />
    </component>
  </div>
</template>

<style scoped></style>
