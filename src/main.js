import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
// 全局消息组件
import Message from '@/components/Message.vue'
import App from './App.vue'
import router from './router/index'
import 'element-plus/dist/index.css'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // JS 按需引入

// 创建并挂载 Message 组件
const messageApp = createApp(Message)
const messageEl = document.createElement('div')
document.body.appendChild(messageEl)
const messageInstance = messageApp.mount(messageEl)
// 挂载到全局 window
window.$message = messageInstance

const app = createApp(App)
app.use(router)

app.config.globalProperties.$message = messageInstance

app.use(ElementPlus)
// 注册所有图标（包含 Switch）
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
