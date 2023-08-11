<template>
  <Confirm
    class="gap-2"
    title="Delete your account"
    description="Your account will be deleted and all of your data will be removed from our servers."
  >
    <div class="flex items-stretch gap-1 mt-4">
      <Button @click="closePopup" class="btn btn-min btn-min-zinc w-full"> Cancel </Button>
      <Button @click="deleteAccount" class="btn btn-red w-full"> Delete </Button>
    </div>
  </Confirm>
</template>

<script setup lang="ts">
import { useLemonStore } from '@/stores/lemon'
import { useFireUser } from '@/composables/fireUser'
import { useStorage } from '@/composables/storage'
import { useRouter } from 'vue-router'
import { usePopup } from '@/composables/popup'
const { get, deleteDocRef } = useFireUser()
const router = useRouter()
const { remove } = useStorage()
const store = useLemonStore()
const { closePopup } = usePopup()

const deleteAccount = async () => {
  console.log('delete account')
  await store.startLoading()
  // fetch fireBase user
  try {
    let user = await get(Number(store.user?.data.id))
    if (user) {
      const res = await Promise.all(
        user.webhooks?.map(async (w: string) => {
          await store.deleteWebhook(w)
        })
      )
      console.log(res)
      await remove('citrus_data')
      await remove('API_KEY')
      await deleteDocRef()
      router.replace('/welcome')
    }
    await store.stopLoading()
  } catch (error) {
    await store.stopLoading()
    console.log(error)
  }
}
</script>

<style scoped></style>
