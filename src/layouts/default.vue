<template>
  <main class="main p-0">
    <Toast />
    <Steps v-if="popup == 'register-steps'" />
    <Confirm v-if="popup == 'confirm'" />
    <UpdateApi v-if="popup == 'update-api'" />
    <More v-if="popup == 'more'" />
    <Support v-if="popup == 'support'" />
    <DeleteAccount v-if="popup == 'delete-account'" />
    <div
      ref="dragAlert"
      :style="{
        opacity: opacity,
        left: dragAlertPos(),
        transform: 'translateY(' + 0 + posY + 'px)'
      }"
      class="flex items-center justify-center fixed rounded-full z-50 px-3 py-2 text-center transition-all duration-0 ease-in-out -translate-y-8 bg-primary-500 text-white"
    >
      <p class="transition-all ease-in-out text-xs">{{ getDragStateText }}</p>
    </div>

    <slot v-if="!loading" />

    <Loader v-else />
    <Footer class="!p-0 z-20">
      <Navbar v-show="!loading" />
    </Footer>
    <!-- <div ref="target" class="absolute top-0 left-0 right-0 bottom-0 opacity-0 z-0"></div> -->
  </main>
</template>

<script setup lang="ts">
import { useLemonStore } from '@/stores/lemon'
import { usePopup } from '@/composables/popup'
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/toast'
import { useNotifications } from '@/composables/notifications'
import DeleteAccount from '@/components/Popover/DeleteAccount.vue'

const target = ref<HTMLElement | null>(null)
const dragAlert = ref<HTMLElement | null>(null)
const opacity = ref(0)
const confirmUpdate = ref(false)
const posY = ref(0)

const { popup } = usePopup()
const router = useRouter()
const store = useLemonStore()
const { showToast } = useToast()
const runNotifications = useNotifications()

onMounted(async () => {
  await store.startLoading()
  try {
    await store.getAllData().then(() => {
      runNotifications()
    })
    // check notifications here
  } catch (e) {
    showToast('Something went wrong please try again', 'error')
    console.log(e)
    router.replace('/welcome')
  }
  if (!store.isAuthenticated) {
    router.replace('/welcome')
    // check notifications here
    return
  }
  await store.stopLoading()
})

const loading = computed(() => store.loading)
const getDragStateText = computed(() => {
  if (isSwiping.value && direction.value === 'down') {
    if (lengthY.value > -100 && lengthY.value < -20) {
      return 'A little more...'
    }

    if (lengthY.value < -101) {
      return 'Good, Release to update'
    }
    return 'Drag down to update'
  }

  return 'Drag down to update'
})

const dragAlertPos = () => {
  // screen width - element width / 2
  if (!dragAlert.value) return 0
  return (window.innerWidth - dragAlert.value?.clientWidth) / 2 + 'px'
}

const startTouchY = ref(0)
const startTouchX = ref(0)
const swipeDirection = ref('none')
const isSwiping = ref(false)
const lengthX = ref(0)
const lengthY = ref(0)

window.addEventListener('touchstart', (e) => {
  startTouchY.value = e.touches[0].clientY
  startTouchX.value = e.touches[0].clientX
  // checkSwipe(startTouchX.value, startTouchY.value, e.touches[0].clientX, e.touches[0].clientY)
})

window.addEventListener('touchmove', (e) => {
  checkSwipe(
    startTouchX.value,
    startTouchY.value,
    e.changedTouches[0].clientX,
    e.changedTouches[0].clientY
  )
})

window.addEventListener('touchend', (e) => {
  opacity.value = 0
  posY.value = 0
  if (confirmUpdate.value) {
    store.startLoading()
    store.getAllData(true).then(async () => {
      showToast('Updated', 'success')
      await store.stopLoading()
    })
    confirmUpdate.value = false
  }
})

const checkSwipe = (xStart: number, yStart: number, xEnd: number, yEnd: number) => {
  const y = yEnd - yStart
  const x = xStart - xEnd

  let direction = ''
  if (y > 0) {
    direction = 'down'
  } else if (y < 0) {
    direction = 'up'
  } else {
    direction = 'none'
  }

  swipeDirection.value = direction
  isSwiping.value = direction !== 'none'
  lengthX.value = x
  lengthY.value = y

  console.log('swipe', direction, x, y)

  if (loading.value) return
  if (direction === 'down') {
    opacity.value = opacity.value + 0.01
    if (posY.value < 32) {
      posY.value = posY.value + 0.5
    } else {
      confirmUpdate.value = true
    }
  }

  if (direction === 'none') {
    opacity.value = opacity.value - 0.01
    if (posY.value > -20) {
      posY.value = posY.value - 0.5
    }
  }
}

// Usage:
// When you swipe on the window, the checkSwipe function will be triggered and you can get the result.
</script>

<style scoped></style>
