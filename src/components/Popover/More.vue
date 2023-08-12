<template>
  <div
    class="bg-primary-600 py-8 px-4 gap-4 text-white flex flex-col fixed top-0 left-0 right-0 bottom-0 items-center justify-end z-50"
  >
    <Button @click="closePopup" class="btn btn-large btn-min text-white absolute top-2 right-2">
      <svg width="24" height="24">
        <use xlink:href="/tabler-sprite.svg#tabler-x" />
      </svg>
    </Button>
    <img class="w-32 h-32" src="@/assets/logo_white.svg" />
    <SupportLink class="text-slate-200" />
    <h2 class="text-label-xl text-white mt-auto">Thank you for the support.</h2>
    <a
      href="https://twitter.com/britzdm"
      target="_blank"
      class="mt-auto flex items-center gap-2 justify-center w-full text-slate-300"
    >
      <p>Follow me on</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-brand-twitter-filled"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M14.058 3.41c-1.807 .767 -2.995 2.453 -3.056 4.38l-.002 .182l-.243 -.023c-2.392 -.269 -4.498 -1.512 -5.944 -3.531a1 1 0 0 0 -1.685 .092l-.097 .186l-.049 .099c-.719 1.485 -1.19 3.29 -1.017 5.203l.03 .273c.283 2.263 1.5 4.215 3.779 5.679l.173 .107l-.081 .043c-1.315 .663 -2.518 .952 -3.827 .9c-1.056 -.04 -1.446 1.372 -.518 1.878c3.598 1.961 7.461 2.566 10.792 1.6c4.06 -1.18 7.152 -4.223 8.335 -8.433l.127 -.495c.238 -.993 .372 -2.006 .401 -3.024l.003 -.332l.393 -.779l.44 -.862l.214 -.434l.118 -.247c.265 -.565 .456 -1.033 .574 -1.43l.014 -.056l.008 -.018c.22 -.593 -.166 -1.358 -.941 -1.358l-.122 .007a.997 .997 0 0 0 -.231 .057l-.086 .038a7.46 7.46 0 0 1 -.88 .36l-.356 .115l-.271 .08l-.772 .214c-1.336 -1.118 -3.144 -1.254 -5.012 -.554l-.211 .084z"
          stroke-width="0"
          fill="currentColor"
        ></path>
      </svg>
    </a>
    <small class="text-slate-400">V {{ version }}</small>
  </div>
</template>

<script setup lang="ts">
import { usePopup } from '@/composables/popup'
import pacakgeJson from '../../../package.json'
const { closePopup } = usePopup()

const version = pacakgeJson.version
</script>

<style scoped></style>
