import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/iconfont.css'
import router from './router/index'
import pinia from './stores/index'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)


app.use(ElementPlus, {
  locale: zhCn,
})

app.use(router)
app.use(pinia)

app.mount('#app')
