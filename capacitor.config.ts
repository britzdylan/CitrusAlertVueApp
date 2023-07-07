import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.citrusalert.app',
  appName: 'Citrus Alert',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: process.env.APP ?? 'http://172.20.104.134:3000',
    cleartext: true
  }
}

export default config
