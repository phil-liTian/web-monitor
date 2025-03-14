/*
 * @author: phil.li
 */
import type { InitOptions } from '@webmonitor/types';
import { transportData } from './reportData';
import { _support, setSilentFlag, validateOption } from '@webmonitor/utils';
import { breadcrumb } from './breadCrumb';

export class Options {
  overTime = 10; // 超时事件, 默认是10s
  throttleDelayTime = 0;
  whiteBoxElements: string[] = [];
  skeletonProject = false;
  repeatCodeError = true;
  filterXhrUrlRegExp: any; // 过滤请求的正则
  constructor() {}

  bindOptions(options: InitOptions) {
    const {
      overTime,
      throttleDelayTime,
      skeletonProject,
      repeatCodeError,
      filterXhrUrlRegExp,
      whiteBoxElements = ['html', 'body', '#app', '#root'],
    } = options;
    validateOption(overTime, 'overTime', 'number') && (this.overTime = overTime || 0);
    validateOption(this.throttleDelayTime, 'throttleDelayTime', 'number') &&
      (this.throttleDelayTime = throttleDelayTime || 0);
    validateOption(whiteBoxElements, 'whiteBoxElements', 'array') &&
      (this.whiteBoxElements = whiteBoxElements || []);
    validateOption(skeletonProject, 'skeletonProject', 'boolean') &&
      (this.skeletonProject = skeletonProject || false);
    validateOption(repeatCodeError, 'repeatCodeError', 'boolean') &&
      (this.repeatCodeError = repeatCodeError || true);
    validateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', 'regexp') &&
      (this.filterXhrUrlRegExp = filterXhrUrlRegExp || null);
  }
}

const options = (_support.options = _support.options || new Options());

export function handleOptions(parmasOptions: InitOptions) {
  // setSlientFlag 给全局增加设置，防止重复添加
  setSilentFlag(parmasOptions);
  // 处理用户行为的配置项
  breadcrumb.bindOptions(parmasOptions);
  // 处理发送的数据
  transportData.bindOptions(parmasOptions);
  // 给options绑定属性(挂载配置性的一些属性)
  options.bindOptions(parmasOptions);
}

export { options };
