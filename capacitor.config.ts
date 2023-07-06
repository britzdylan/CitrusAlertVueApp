import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.citrusalert.app',
  appName: 'Citrus Alert',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
