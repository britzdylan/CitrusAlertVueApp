import { db } from '@/firebase'
import { doc, runTransaction, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
class User {
  id: number = 0
  api_key: string = ''
  device_id: string = ''
  webhook_id: string = ''
  ls_user_id: string = ''

  private static getNextUserId = async (): Promise<number> => {
    const docRef = doc(db, 'meta', 'ids')

    try {
      return await runTransaction(db, async (transaction) => {
        const doc = await transaction.get(docRef)
        const newId: number = doc.data() ? doc?.data()?.user + 1 : 0
        transaction.set(docRef, { user: newId })
        return newId
      })
    } catch (error) {
      console.error('Error getting next user ID: ', error)
      throw error
    }
  }

  static async init(data: User): Promise<User> {
    const user = new User()
    user.id = await User.getNextUserId()
    Object.assign(user, data)
    return user
  }

  static async get(id: number): Promise<User | null> {
    const docRef = doc(db, 'users', String(id))
    try {
      const user = await getDoc(docRef)
      if (user.exists()) {
        return user.data() as User
      } else {
        return null
      }
    } catch (error) {
      console.error('Error getting user: ', error)
      throw error
    }
  }

  async save(): Promise<void> {
    const docRef = doc(db, 'users', String(this.id))
    try {
      await setDoc(docRef, Object.assign({}, this))
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
}

export default User
