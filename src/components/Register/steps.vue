<template>
  <Blanket @close="close">
    <div class="card gap-4">
      <p class="text-label-xl font-semibold tracking-tighter">Please be patient while we:</p>
      <List class="flex flex-col gap-4">
        <template v-for="(item, index) in steps">
          <ListItem :class="getStepClass(index)" :icon="getItemIcon(index)">{{
            item.title
          }}</ListItem>
        </template>
      </List>
    </div>
  </Blanket>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
export interface TStep {
  title: string
  busy: boolean
  completed: boolean
  error: boolean
}

const props = defineProps({
  PSteps: {
    required: false,
    type: Array<TStep>,
    default: []
  },
  PCurrentStep: {
    type: Number,
    default: 0
  }
})

const steps = ref([
  {
    title: 'Add your Lemon Squeezy API Key',
    busy: false,
    completed: false,
    error: false
  },
  {
    title: 'Encrypting your API Key',
    busy: false,
    completed: false,
    error: false
  },
  {
    title: 'Fetching your Stores',
    busy: false,
    completed: false,
    error: false
  },
  {
    title: 'Finalizing your account',
    busy: false,
    error: false,
    completed: false
  }
])
const currentStep = ref(props.PCurrentStep)

onMounted(() => {
  steps.value[currentStep.value].busy = true
  setTimeout(() => {
    currentStep.value++
  }, 1000)
})

const nextStep = (value: number) => {
  if (value > steps.value.length) {
    return
  }
  if (value > 1) {
    steps.value[value - 1].completed = true
  } else {
    steps.value[0].completed = true
  }

  if (value === steps.value.length) {
    setTimeout(() => {
      router.push({ name: 'notifications' })
    }, 1000)
    return
  } else {
    steps.value[value].busy = true
    setTimeout(() => {
      currentStep.value++
    }, 1000)
  }
}

const getItemIcon = (index: number) => {
  if (steps.value[index].completed) {
    return 'circle-check'
  }

  if (steps.value[index].busy) {
    return 'loader-2'
  }

  return 'circle'
}

const getStepClass = (index: number) => {
  if (steps.value[index].completed) {
    return '!text-primary-800'
  }

  if (steps.value[index].busy) {
    return '!text-primary-400 iconSpin'
  }

  return '!text-zinc-400'
}

watch(
  currentStep,
  async (newVal, oldVal) => {
    if (newVal <= steps.value.length) {
      console.log('Watching steps - newVal', newVal)
      nextStep(newVal)
    }
  },
  { immediate: true }
)

const close = () => {
  router.replace({
    path: route.path,
    query: {}
  })
}
</script>

<style scoped></style>
