import { ref } from 'vue'
import { db } from '@/firebase'
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'

interface Payload {
  id: number
  notif_token?: string
  webhooks?: string[]
}

export function useFireUser() {
  const fireUser = ref<Payload | null>(null)

  const init = async (data: Payload) => {
    fireUser.value = data
  }

  const get = async (id: number) => {
    const docRef = doc(db, 'users', String(id))
    try {
      const userDoc = await getDoc(docRef)
      if (userDoc.exists()) {
        fireUser.value = userDoc.data() as Payload
      } else {
        fireUser.value = null
      }
    } catch (error) {
      console.error('Error getting fireUser: ', error)
      throw error
    }
  }

  const save = async (data?: Payload) => {
    const docRef = doc(db, 'users', String(fireUser.value?.id))
    const payload = {
      notif_token: data?.notif_token || fireUser.value?.notif_token,
      webhook_id: data?.webhooks || fireUser.value?.webhooks
    }
    try {
      await setDoc(docRef, payload)
    } catch (error) {
      console.error('Error saving fireUser: ', error)
      throw error
    }
  }

  const deleteDocRef = async () => {
    const docRef = doc(db, 'users', String(fireUser.value?.id))
    try {
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleting fireUser: ', error)
      throw error
    }
  }

  const updateOrCreate = async <T extends Payload>(data: T) => {
    try {
      await get(data.id)
      if (!fireUser.value) {
        await init(data)
        return await save()
      }
      return await save(data)
    } catch (error) {
      console.error('Error running update for fireUser: ', error)
      throw error
    }
  }

//

  return { fireUser, init, get, save, deleteDocRef, updateOrCreate }
}
