import router from './router/router.js'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App)
    .use(router)
    .mount('#app')
