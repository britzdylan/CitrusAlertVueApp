<template>
  <div class="input input-large">
    <label v-if="label">{{ label }}</label>
    <span :class="state">
      <span v-if="prefix" class="input-prefix">{{ prefix }}</span>
      <svg v-if="lIcon" width="24" height="24">
        <use :xlink:href="`/tabler-sprite.svg#tabler-${lIcon}`" />
      </svg>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        :type="type"
        :disabled="disabled"
        :title="type"
        :placeholder="placeholder"
      />
      <svg v-if="rIcon" width="24" height="24">
        <use :xlink:href="`/tabler-sprite.svg#tabler-${rIcon}`" />
      </svg>
      <span v-if="suffix" class="input-suffix">{{ suffix }}</span>
    </span>
    <label v-if="helper" class="helper">
      <span>{{ helper }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
export interface InputProps {
  label?: string
  placeholder?: string
  helper?: string
  type?: string
  disabled?: boolean
  state?: string
  lIcon?: string
  rIcon?: string
  prefix?: string
  suffix?: string
  modelValue?: string
}

const props: InputProps = defineProps({
  label: {
    type: String
  },
  placeholder: {
    type: String
  },
  helper: {
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  state: {
    type: String,
    default: 'none'
  },
  lIcon: {
    type: String
  },
  rIcon: {
    type: String
  },
  prefix: {
    type: String
  },
  suffix: {
    type: String
  },
  modelValue: {
    type: String
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped></style>
