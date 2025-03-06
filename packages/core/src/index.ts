/*
 * @author: phil.li
 */
// 前端性能指标：LCP、FID、CLS、TBT、TTI、FCP、TTFB
import type { VueInstance, ViewModel, InitOptions } from '@webmonitor/types';
import { handleOptions } from './core/options';
import { setupReplace } from './core/setupReplace';
import { HandleEvents } from './core/handleEvents';

function init(options: InitOptions) {
  if (!options.dsn) {
    return console.error('请配置dsn');
  }
  // 初始化配置
  handleOptions(options);
  setupReplace();
}

// 处理vue相关错误
function install(Vue: VueInstance, options: InitOptions) {
  const handler = Vue.config.errorHandler;
  Vue.config.errorHandler = function (err: Error, vm: ViewModel, info: string) {
    HandleEvents.handleError(err);
    handler && handler.apply(null, [err, vm, info]);
  };
  init(options);
}

export default {
  install,
};
