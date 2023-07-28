import { db } from '@/firebase'
import { doc, setDoc, collection, runTransaction } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
class User {
  api_key: string
  device_token: string
  constructor(api_key: string, device_token: string) {
    this.api_key = api_key
    this.device_token = device_token
  }
}
export function useFireStore() {
  const createUser = async (token: string, id: number) => {
    const user = new User('api_key', token)
    await setDoc(doc(db, 'users', String(id)), Object.assign({}, user))
    return id
  }

  const getNextUserId = async (): Promise<number> => {
    const docRef = doc(db, 'counters', 'users')

    return runTransaction(db, async (transaction) => {
      const doc = await transaction.get(docRef)
      // console.log(doc.data(), '//////////////////////////// ')
      if (!doc.exists()) {
        throw new Error('Counter document does not exist')
      }

      const newId: number = doc.data().ids + 1
      transaction.update(docRef, { ids: newId })

      return newId
    })
  }

  return { createUser, getNextUserId }
}
