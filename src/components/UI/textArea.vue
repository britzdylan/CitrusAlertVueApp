<template>
  <div class="textarea w-full">
    <span class="w-full">
      <textarea
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        :placeholder="placeHolder"
      >
        {{ modelValue }}
      </textarea>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  placeHolder: {
    type: String,
    default: 'Your message'
  },
  modelValue: {
    type: String
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped></style>
<!-- TODO Text Area -->
