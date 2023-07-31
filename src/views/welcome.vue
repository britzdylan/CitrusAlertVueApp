<template>
  <section class="screen justify-center">
    <img
      src="@/assets/images/splash.png"
      alt="CitrusAlert"
      class="-mb-24 w-full max-w-[280px] mx-auto"
    />
    <img src="@/assets/logo.svg" alt="CitrusAlert" width="200" height="200" />
    <p class="text-center">
      {{ subTitle }}
    </p>
    <LayoutFooter>
      <router-link to="/register" class="btn btn-primary w-full">Let's get started</router-link>
    </LayoutFooter>
  </section>
</template>

<script setup lang="ts">
import LayoutFooter from '@/components/Layout/footer.vue'
const subTitle = 'The new way to stay on top of your sales game!'
</script>

<style scoped></style>
