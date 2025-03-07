/*
 * @author: phil.li
 */
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import webMonitor from '../../../packages/core/src/index';

const app = createApp(App);
app.use(webMonitor, {
  dsn: 'http://localhost:3003/reportData',
  apikey: 'vue3-project',
  userId: 'phil.li',
});
app.mount('#app');
