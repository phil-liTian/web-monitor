/*
 * @author: phil.li
 */
// 前端性能指标：LCP、FID、CLS、TBT、TTI、FCP、TTFB
import type { VueInstance, ViewModel } from '@webmonitor/types';

function install(Vue: VueInstance) {
  console.log('vue', Vue);

  const handler = Vue.config.errorHandler;
  Vue.config.errorHandler = function (err: Error, vm: ViewModel, info: string) {
    console.log('err', err, vm, info);

    handler && handler.apply(null, [err, vm, info]);
  };
}

export default {
  install,
};
