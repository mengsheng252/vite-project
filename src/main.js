// import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // JS 按需引入
import 'element-plus/dist/index.css'

// createApp(App).mount('#app')
const app = createApp(App)
app.use(router)
// app.use(ElementPlus)
app.mount('#app')
