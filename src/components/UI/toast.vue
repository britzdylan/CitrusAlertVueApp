<template>
  <div
    id="toast"
    data-show="false"
    class="toast z-50 fixed top-0 transition-all ease-out duration-300 left-2 right-2 w-auto justify-center shadow-light-600"
  >
    <span id="toast-text" class="!mr-0">Notification</span>
    <!-- icon -->
    <svg id="toast-dismiss" class="hidden ml-auto" width="36" height="36">
      <use xlink:href="/tabler-sprite.svg#tabler-x" />
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
