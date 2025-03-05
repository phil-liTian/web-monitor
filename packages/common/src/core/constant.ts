/*
 * @author: phil.li
 */
// 事件类型
export enum EVENTTYPES {
  XHR = 'xhr',
  FETCH = 'fetch',
  CLICK = 'click',
  HISTORY = 'history',
  ERROR = 'error',
  HASHCHANGE = 'hashchange',
  RESOURCE = 'resource',
  UNHANDLEDREJECTION = 'unhandledrejection',
  DOM = 'dom',
  VUE = 'vue',
  CUSTOM = 'custom',
  PERFORMANCE = 'performance',
  RECORDSCREEN = 'recordScreen',
  WHITESCREEN = 'whiteScreen',
}

// 请求类型
export enum HTTPTYPE {
  XHR = 'xhr',
  FETCH = 'fetch',
}
