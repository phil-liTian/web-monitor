/*
 * @author: phil.li
 */
import { EVENTTYPES } from '@webmonitor/common';
import { addReplaceHandler } from './replace';
import { HandleEvents } from './handleEvents';
export function setupReplace(): void {
  // js 语法错误
  addReplaceHandler({
    type: EVENTTYPES.ERROR,
    callback: data => {
      console.log('js error 捕获到了', data);
      HandleEvents.handleError(data);
    },
  });

  // promise 错误， 不包括reject
  addReplaceHandler({
    type: EVENTTYPES.UNHANDLEDREJECTION,
    callback: data => {
      console.log('promise error 捕获到了', data);
      HandleEvents.handleUnhandledrejection(data);
    },
  });

  // xhr 请求错误 重写XMLHttpRequest
  addReplaceHandler({
    type: EVENTTYPES.XHR,
    callback: data => {
      console.log('xhr 错误', data);
      HandleEvents.handleHttp(data);
    },
  });
}
