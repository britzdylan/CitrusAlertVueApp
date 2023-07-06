<template>
  <Blanket>
    <div class="card gap-4">
      <h3 class="text-label-xl font-semibold">{{ props.title }}</h3>
      <p v-if="props.description" class="text-label">
        {{ props.description }}
      </p>
      <slot>
        <div class="flex items-stretch gap-1">
          <button @click="submit('close')" class="btn btn-min btn-min-zinc w-full">
            {{ props.cancel }}
          </button>
          <button @click="submit('confirm')" class="btn btn-primary w-full">
            {{ props.confirm }}
          </button>
        </div>
      </slot>
    </div>
  </Blanket>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { usePopup } from '@/composables/popup'
const router = useRouter()
const route = useRoute()
const { closePopup } = usePopup()

export interface Confirm {
  title: string
  description: string
  cancel: string
  confirm: string
}

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  cancel: {
    type: String,
    required: true,
    default: 'Cancel'
  },
  confirm: {
    type: String,
    required: true,
    default: 'Confirm'
  }
})

const emits = defineEmits(['close', 'confirm'])

const submit = (t: 'close' | 'confirm') => {
  emits(t)
  closePopup()
}
</script>

<style scoped></style>
