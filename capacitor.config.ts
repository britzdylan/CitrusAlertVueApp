import { CapacitorConfig } from '@capacitor/cli'

const server = () => {
  if (process.env.VITE_SERVER) {
    return {
      url: 'http://172.20.104.53:3000',
      cleartext: true
    }
  }
}

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
  },
  ...server()
}

export default config
