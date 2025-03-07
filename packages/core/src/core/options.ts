/*
 * @author: phil.li
 */
import type { InitOptions } from '@webmonitor/types';
import { transportData } from './reportData';
import { _support, validateOption } from '@webmonitor/utils';

export class Options {
  overTime = 10; // 超时事件, 默认是10s
  constructor() {}

  bindOptions(options: InitOptions) {
    const { overTime } = options;
    validateOption(overTime, 'overTime', 'number') && (this.overTime = overTime || 0);
  }
}

const options = (_support.options = _support.options || new Options());

export function handleOptions(parmasOptions: InitOptions) {
  // 处理发送的数据
  transportData.bindOptions(parmasOptions);
  // 给options绑定属性(挂载配置性的一些属性)
  options.bindOptions(parmasOptions);
}
