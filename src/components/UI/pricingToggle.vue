<template>
  <div
    class="relative p-0.5 rounded-full border border-zinc-200 flex items-stretch justify-between bg-white text-zinc-500"
  >
    <div
      :class="getActiveTab(activeTab)"
      class="absolute left-1 top-1 bottom-1 rounded-full w-[150px] transition-all duration-150 ease-out text-white bg-primary-700 z-0"
    ></div>
    <template v-for="(item, index) in tabs" :key="index + 'tab'">
      <div
        @click="setActiveTab(index)"
        :class="getActiveText(index)"
        class="z-10 flex flex-col items-center justify-center flex-grow rounded-full w-[150px] h-[48px] bg-transparent"
      >
        <p>{{ item }}</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  activeTab: {
    type: Number,
    default: 0
  },
  tabs: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:activeTab'])

const activeTab = ref(props.activeTab)

const getActiveTab = (cP: number) => {
  if (activeTab.value === 1) {
    return 'active'
  }
  return ''
}

const getActiveText = (cP: number) => {
  return activeTab.value === cP ? 'activeText' : ''
}

const setActiveTab = (cP: number) => {
  activeTab.value = cP
  emit('update:activeTab', cP)
}
</script>

<style scoped>
.active {
  @apply translate-x-[147px];
}

.activeText {
  @apply text-white;
}
</style>
