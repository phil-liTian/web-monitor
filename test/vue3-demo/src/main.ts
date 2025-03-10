/*
 * @author: phil.li
 */
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import webMonitor from '../../../packages/core/src/index';
import RecordScreen from '../../../packages/recordscreen/src/index';
import WebPerformance from '../../../packages/performance/src/index';
import router from './router';

const app = createApp(App);
app.use(webMonitor, {
  dsn: 'http://localhost:3005/reportData',
  apikey: 'vue3-project',
  userId: 'phil.li',
  skeletonProject: true, // 使用了骨架屏
});

// 使用录屏插件
webMonitor.use(RecordScreen, {});
webMonitor.use(WebPerformance, {});

app.use(router);
app.mount('#app');
