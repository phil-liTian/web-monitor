/*
 * @author: phil.li
 */
/*
 * @author: phil.li
 */
import { BREADCRUMBTYPES, EVENTTYPES } from '@webmonitor/common';
import type { BreadcrumbData, InitOptions } from '@webmonitor/types';
import { _support, getTimestamp, validateOption } from '@webmonitor/utils';
export class Breadcrumb {
  maxBreadcrumbs = 20;
  stack: BreadcrumbData[] = [];
  boforePushBreadcrumb?: (breadcrumb: BreadcrumbData) => any;
  constructor() {
    this.stack = [];
  }

  bindOptions(options: InitOptions) {
    const { maxBreadcrumbs, boforePushBreadcrumb } = options;
    validateOption(maxBreadcrumbs, 'maxBreadcrumbs', 'number') &&
      (this.maxBreadcrumbs = maxBreadcrumbs || 20);

    validateOption(boforePushBreadcrumb, 'boforePushBreadcrumb', 'function') &&
      (this.boforePushBreadcrumb = boforePushBreadcrumb as unknown as (breadcrumb: BreadcrumbData) => any);
  }

  getCategory(type: EVENTTYPES) {
    switch (type) {
      // js异常
      case EVENTTYPES.ERROR:
      case EVENTTYPES.UNHANDLEDREJECTION:
        return BREADCRUMBTYPES.CODEERROR;
      case EVENTTYPES.CLICK:
        return BREADCRUMBTYPES.CLICK;
      // 资源加载异常
      case EVENTTYPES.RESOURCE:
        return BREADCRUMBTYPES.RESOURCE;
      // 接口请求
      case EVENTTYPES.XHR:
      case EVENTTYPES.FETCH:
        return BREADCRUMBTYPES.HTTP;
      case EVENTTYPES.HASHCHANGE:
      case EVENTTYPES.HISTORY:
        return BREADCRUMBTYPES.ROUTE;
    }
  }

  push(data: BreadcrumbData) {

    // 可自定义用户行为收集的字段及内容
    if ( typeof this.boforePushBreadcrumb === 'function' ) {
      const result = this.boforePushBreadcrumb(data);
      if ( !result ) return
      this.immediatePush(result);
      return
    }

    this.immediatePush(data);
  }

  immediatePush(data: BreadcrumbData) {
    data.time || (data.time = getTimestamp());
    if (this.stack.length >= this.maxBreadcrumbs) {
      this.shift();
    }
    this.stack.push(data);
    this.stack.sort((a, b) => a.time - b.time);
  }

  shift() {
    return this.stack.shift() !== undefined;
  }

  getStack() {
    return this.stack;
  }

  clear() {
    this.stack = [];
  }
}

const breadcrumb = _support.breadcrumb || (_support.breadcrumb = new Breadcrumb());
export { breadcrumb };
