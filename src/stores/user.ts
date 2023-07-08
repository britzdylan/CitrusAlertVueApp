import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getData } from '@/composables/api'
import { showToast } from '@/composables/toast'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  async function fetchUser(showAlert = false, message?: string) {
    try {
      const { data } = await getData('users/me')
      if (!data) throw new Error('No user found or invalid api key')
      user = data
    } catch (error) {
      await showToast(error, 'error')
      return null
    }
  }

  return { user, getUser }
})
