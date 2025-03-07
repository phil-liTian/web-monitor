/*
 * @author: phil.li
 */
import { BREADCRUMBTYPES, EVENTTYPES } from '@webmonitor/common';
import type { BreadcrumbData } from '@webmonitor/types';
import { _support, getTimestamp } from '@webmonitor/utils';
export class Breadcrumb {
  maxBreadcrumbs = 20;
  stack: BreadcrumbData[] = [];
  constructor() {
    this.stack = [];
  }

  getCategory(type: EVENTTYPES) {
    switch (type) {
      // js异常
      case EVENTTYPES.ERROR:
      case EVENTTYPES.UNHANDLEDREJECTION:
        return BREADCRUMBTYPES.CODEERROR;
      // 资源加载异常
      case EVENTTYPES.RESOURCE:
        return BREADCRUMBTYPES.RESOURCE;
      // 接口请求
      case EVENTTYPES.XHR:
      case EVENTTYPES.FETCH:
        return BREADCRUMBTYPES.HTTP;
      case EVENTTYPES.HASHCHANGE:
        return BREADCRUMBTYPES.ROUTE;
    }
  }

  push(data: BreadcrumbData) {
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
