import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { firebaseApp } from './firebase'

import App from './App.vue'
import router from './router'
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
