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
      console.log('userDoc', userDoc)
      if (userDoc.exists()) {
        fireUser.value = userDoc.data() as Payload
        return userDoc.data()
      } else {
        fireUser.value = null
        return null
      }
    } catch (error) {
      console.error('Error getting fireUser: ', error)
      throw error
    }
  }

  const save = async (data?: Payload) => {
    const docRef = doc(db, 'users', String(data?.id))
    const payload = {
      notif_token: data?.notif_token || fireUser.value?.notif_token,
      webhooks: data?.webhooks || fireUser.value?.webhooks
    }
    try {
      return await setDoc(docRef, payload)
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
      let user = await get(data.id)
      console.log(user)
      if (!user) {
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
