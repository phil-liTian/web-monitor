/*
 * @author: phil.li
 */
// 前端性能指标：LCP、FID、CLS、TBT、TTI、FCP、TTFB
import type { VueInstance } from '@webmonitor/types'

function install(vue: VueInstance) {
  console.log('vue', vue);
}

export default {
  install
}