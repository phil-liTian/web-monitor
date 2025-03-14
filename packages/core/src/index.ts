/*
 * @author: phil.li
 */
import type { VueInstance, ViewModel, InitOptions } from '@webmonitor/types';
import { handleOptions, options } from './core/options';
import { log } from './core/customLog'
import { setupReplace } from './core/setupReplace';
import { HandleEvents } from './core/handleEvents';
import { transportData } from './core';
import { breadcrumb } from './core/breadcrumb';
import { _global } from '@webmonitor/utils';

function init(options: InitOptions) {
  if (!options.dsn) {
    return console.error('请配置dsn');
  }
  if ( !('fetch' in _global) || options.disabled ) return
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

function use(Plugin: any, option: any) {
  const instance = new Plugin(option);
  instance.core({ transportData, breadcrumb, options });
}

export default {
  install,
  use,
  log,
};
