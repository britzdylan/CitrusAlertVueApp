<template>
  <div :class="isOpen" class="accordion accordion-zinc accordion-zinc-open">
    <header @click="open = !open">
      <p>{{ accordion.title }}</p>
      <svg
        :class="open ? 'rotate-90' : ''"
        class="transition-all ease-linear duration-300"
        width="24"
        height="24"
      >
        <use xlink:href="/tabler-sprite.svg#tabler-chevron-down" />
      </svg>
    </header>
    <div class="accordion-body">
      <p>
        {{ accordion.body }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
export interface AccordionItem {
  title: string
  body: string
  open: boolean
}

const props = defineProps<{
  accordion: AccordionItem
}>()
const open = ref(props.accordion.open)
const isOpen = computed(() => {
  return open.value ? 'accordion-open' : ''
})
</script>

<style scoped></style>
