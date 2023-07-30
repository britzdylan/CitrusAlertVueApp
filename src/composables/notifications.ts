import {
  PushNotifications,
  type ActionPerformed,
  type PushNotificationSchema,
  type Token
} from '@capacitor/push-notifications'
import { LocalNotifications } from '@capacitor/local-notifications'
import { useLemonStore } from '@/stores/lemon'
import { useFireUser } from './fireUser'
const { get, save, updateOrCreate } = useFireUser()

export function useNotifications() {
  const initialize = async () => {
    const { user, deviceInfo, setupWebhooks } = useLemonStore()
    if (deviceInfo?.platform === 'web') return true
    // Check permission
    const permission = await PushNotifications.checkPermissions()
    if (permission.receive === 'prompt') {
      // Request permission
      await PushNotifications.requestPermissions()
    }

    // TODO: if permission is denied then find user and delete notif_token && webhooks

    if (permission.receive === 'denied') {
      let u = await get(Number(user?.data?.id))
      if (u) {
        let data = {
          id: Number(user?.data?.id),
          notif_token: '',
          webhooks: []
        }
        await save(data)
      }
      alert('permission denied, please enable notifications in settings')
    }
    // If on Android, check if notifications are enabled in system settings
    if (deviceInfo?.platform === 'android') {
      const notifEnabled = await LocalNotifications.checkPermissions()
      if (!notifEnabled) {
        // TODO: Show a message to the user explaining that they need to enable notifications
        alert('LocalNotifications permission denied, please enable notifications in app settings')
        return
      }
    }

    PushNotifications.addListener('registration', async (token: Token) => {
      // updateOrCreate webhooks
      try {
        const fireUser = await get(Number(user?.data?.id))
        console.log(fireUser)
        let result = await setupWebhooks(Number(user?.data?.id), fireUser?.webhooks || [])
        if (!result) throw new Error('Error setting up webhooks')
        await updateOrCreate({
          id: Number(user?.data?.id),
          notif_token: token.value,
          // @ts-ignore
          webhooks: result.map((webhook) => webhook.data.id)
        })
      } catch (error) {
        // TODO: handle error
        console.error(error)
      }

      console.log('Push registration success, token: ' + token.value)
    })

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ' + JSON.stringify(error))
    })

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification))
      }
    )

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification))
      }
    )

    PushNotifications.register()
  }

  return initialize
}
