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
    },
    SplashScreen: {
      launchAutoHide: false,
      launchFadeOutDuration: 350,
      backgroundColor: '#2169ef',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#ffffff',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: false
    }
  }
  // server: {
  //   url: 'http://172.27.16.1:3000',
  //   cleartext: true
  // }
}

export default config
