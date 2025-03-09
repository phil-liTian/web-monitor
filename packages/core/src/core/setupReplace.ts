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
      HandleEvents.handleHttp(data);
    },
  });

  // 监听click事件, 用于记录用户行为
  addReplaceHandler({
    type: EVENTTYPES.CLICK,
    callback: data => {
      HandleEvents.handleClick(data);
    },
  });

  // 监听hash变化，用于记录用户行为
  addReplaceHandler({
    type: EVENTTYPES.HASHCHANGE,
    callback: data => {
      HandleEvents.handleHashChange(data);
    },
  });

  // 监听history路由变化，用于记录用户行为
  addReplaceHandler({
    type: EVENTTYPES.HISTORY,
    callback: data => {
      HandleEvents.handleHistory(data);
    },
  });

  // 监听页面白屏
  addReplaceHandler({
    type: EVENTTYPES.WHITESCREEN,
    callback: () => {
      HandleEvents.handleWhiteScreen();
    },
  });
}
