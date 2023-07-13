<template>
  <div
    @click="() => $emit('close')"
    class="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col items-center justify-center p-8"
  >
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
