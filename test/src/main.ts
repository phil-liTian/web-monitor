/*
 * @author: phil.li
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import webMonitor from '../../packages/core/src/index'


const app = createApp(App)
app.use(webMonitor)
app.mount('#app')
