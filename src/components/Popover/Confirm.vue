<template>
  <Blanket>
    <div class="card gap-1">
      <svg v-show="showX" class="absolute top-2 right-2" @click="closePopup" width="20" height="20">
        <use xlink:href="/tabler-sprite.svg#tabler-x" />
      </svg>
      <h3 class="text-label font-semibold">{{ props.title }}</h3>
      <p v-if="props.description" class="text-label-sm">
        {{ props.description }}
      </p>
      <slot>
        <div class="flex items-stretch gap-1 mt-4">
          <Button @click="submit('close')" class="btn btn-min btn-min-zinc w-full">
            {{ props.cancel }}
          </Button>
          <Button @click="submit('confirm')" class="btn btn-primary w-full">
            {{ props.confirm }}
          </Button>
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
  showX: {
    type: Boolean,
    required: false,
    default: false
  },
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
