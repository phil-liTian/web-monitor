/*
 * @author: phil.li
 */
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import webMonitor from '../../../packages/core/src/index';
import router from './router';

const app = createApp(App);
app.use(webMonitor, {
  dsn: 'http://localhost:3005/reportData',
  apikey: 'vue3-project',
  userId: 'phil.li',
});
app.use(router);
app.mount('#app');
