import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.citrusalert.app',
  appName: 'Citrus Alert',
  webDir: 'dist',
  plugins: {
    FirebaseMessaging: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_attach_money',
      iconColor: '#ffffff',
      sound: 'beep.wav'
    }
  }
  // server: {
  //   url: process.env.APP_HOST || '',
  //   cleartext: true
  // }
}

export default config
