import { onMounted } from 'vue'
import {
  PushNotifications,
  type ActionPerformed,
  type PushNotificationSchema,
  type Token
} from '@capacitor/push-notifications'
import { LocalNotifications } from '@capacitor/local-notifications'
import User from '@/models/user'
import { useLemonStore } from '@/stores/lemon'

interface NotifPayload {
  id: number
  api_key?: string
  notif_token: string
  webhooks?: string[]
}

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
      const u = await User.get(Number(user?.data?.id))
      if (u) {
        u.notif_token = ''
        u.webhooks = []
        await u.save(u)
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

    PushNotifications.register()

    PushNotifications.addListener('registration', async (token: Token) => {
      // updateOrCreate webhooks
      try {
        let u = await User.get(Number(user?.data?.id))
        if (!u) throw new Error('User not found')
        let result = await setupWebhooks(Number(user?.data?.id), u?.webhooks || [])
        if (!result) throw new Error('Error setting up webhooks')
        User.updateOrCreate<NotifPayload>({
          id: Number(user?.data?.id),
          notif_token: token.value,
          // @ts-ignore
          webhooks: result.data.map((webhook) => webhook.id)
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
  }

  onMounted(() => {
    initialize()
  })
}
