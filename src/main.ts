import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/iconfont.css'
import router from './router/index'
import pinia from './stores/index'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
