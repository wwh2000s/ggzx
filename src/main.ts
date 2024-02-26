import './styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import gloablComponent from './components/index';
//@ts-ignore   这个不支持ts 要忽略
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import pinia from './stores'
import './permission'

const app = createApp(App)

pinia.use(piniaPluginPersistedstate);
app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(gloablComponent);
app.mount('#app')
