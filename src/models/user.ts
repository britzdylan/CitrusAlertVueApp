import { db } from '@/firebase'
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'

interface Payload {
  id: number
  api_key?: string
  notif_token?: string
  webhooks?: string[]
}
class FireUser {
  id: number = 0
  api_key: string = ''
  notif_token: string = ''
  webhooks: string[] = []

  static async init(data: Payload): Promise<FireUser> {
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

  async save(data?: Payload): Promise<void> {
    const docRef = doc(db, 'users', String(this.id))
    const payload = {
      api_key: data?.api_key || this.api_key,
      notif_token: data?.notif_token || this.notif_token,
      webhook_id: data?.webhooks || this.webhooks
    }
    try {
      await setDoc(docRef, payload)
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

  static async updateOrCreate<T extends Payload>(data: T): Promise<void> {
    try {
      let user = await FireUser.get(data.id)
      if (!user) {
        user = await FireUser.init(data)
        return await user.save()
      }
      return await user.save(data)
    } catch (error) {
      console.error('Error running update for user: ', error)
      throw error
    }
  }

  static getApiKey(id: number): Promise<string | null> {
    return new Promise(async (resolve, reject) => {
      let key = await this.get(id)
      if (!key) {
        reject(null)
      } else {
        resolve(key.api_key)
      }
    })
  }
}

export default FireUser
