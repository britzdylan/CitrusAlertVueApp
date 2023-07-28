import { db } from '@/firebase'
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs
} from 'firebase/firestore'

interface NewUserPayload {
  id: number
  api_key?: string
  notif_token?: string
  webhook_id?: string
}

interface UserPayload {
  id: number
  api_key: string
  notif_token: string
  webhook_id: string
}
class FireUser {
  id: number = 0
  api_key: string = ''
  notif_token: string = ''
  webhook_id: string = ''

  static async init(data: NewUserPayload): Promise<FireUser> {
    const user = new FireUser()
    Object.assign(user, data)
    return user
  }

  static async get(id: number): Promise<FireUser | null> {
    const docRef = doc(db, 'users', String(id))
    try {
      const user = await getDoc(docRef)
      if (user.exists()) {
        return user.data() as FireUser
      } else {
        return null
      }
    } catch (error) {
      console.error('Error getting user: ', error)
      throw error
    }
  }

  static getByLsUserId(ls_user_id: string): Promise<FireUser | null> {
    return new Promise(async (resolve, reject) => {
      const docRef = collection(db, 'users')
      try {
        const q = query(docRef, where('ls_user_id', '==', ls_user_id))
        const users = await getDocs(q)
        users.forEach((user) => {
          resolve(user.data() as FireUser)
        })
      } catch (error) {
        console.error('Error getting user: ', error)
        reject(error)
      }
    })
  }

  async save(): Promise<void> {
    const docRef = doc(db, 'users', String(this.id))
    const payload = {
      api_key: this.api_key,
      notif_token: this.notif_token,
      webhook_id: this.webhook_id
    }
    try {
      await setDoc(docRef, Object.assign({}, payload))
    } catch (error) {
      console.error('Error saving user: ', error)
      throw error
    }
  }

  async delete(): Promise<void> {
    const docRef = doc(db, 'users', String(this.id))
    try {
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleting user: ', error)
      throw error
    }
  }

  static async notificationUpdate(data: UserPayload): Promise<void> {
    try {
      let user = await FireUser.init(data)
      await user.save()
    } catch (error) {
      console.error('Error running notification update for user: ', error)
      throw error
    }
  }
}

export default FireUser
