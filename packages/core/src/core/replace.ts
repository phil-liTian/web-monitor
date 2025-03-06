/*
 * @author: phil.li
 */
import { EVENTTYPES, HTTPTYPE } from '@webmonitor/common';
import type { ReplaceHandler, voidFunc } from '@webmonitor/types';
import { _global, getTimestamp, replaceAop, veriableTypeDetection } from '@webmonitor/utils';
import { on } from '@webmonitor/utils';
import { notify, subscribeEvent } from './subscribe';

function replace(type: EVENTTYPES) {
  switch (type) {
    case EVENTTYPES.ERROR:
      listenError();
      break;
    case EVENTTYPES.UNHANDLEDREJECTION:
      listenUnhandledrejection();
      break;
    case EVENTTYPES.XHR:
      xhrReplace();
      break;
  }
}

export function addReplaceHandler(handler: ReplaceHandler) {
  if (!subscribeEvent(handler)) return;
  replace(handler.type);
}

// 错误处理 window.onerror, 可以捕获语法错误
function listenError(): void {
  on(
    _global,
    'error',
    (e: ErrorEvent) => {
      notify(EVENTTYPES.ERROR, e);
    },
    true,
  );
}

// 处理promise被reject且没有reject处理器的情况
function listenUnhandledrejection(): void {
  on(_global, EVENTTYPES.UNHANDLEDREJECTION, (e: PromiseRejectionEvent) => {
    // 阻止控制台报红色错误
    // e.preventDefault();
    notify(EVENTTYPES.UNHANDLEDREJECTION, e);
  });
}

// 处理xhr请求
function xhrReplace() {
  if (!('XMLHttpRequest' in _global)) return;
  const originalXhrProto = XMLHttpRequest.prototype;

  // 重写xhr open方法
  replaceAop(
    originalXhrProto,
    'open',
    (originalOpen: voidFunc) => {
      return function (this, ...args: any[]) {
        console.log('args', this, args);

        this.webmonitor_xhr = {
          method: veriableTypeDetection.isString(args[0]) ? args[0].toUpperCase() : args[0],
          url: args[1],
          sTime: getTimestamp(),
          type: HTTPTYPE.XHR,
        };

        originalOpen.apply(this, args);
      };
    },
    true,
  );

  // 重写xhr send方法
  replaceAop(XMLHttpRequest.prototype, 'send', (originalSend: voidFunc) => {
    return function (this, ...args: any[]) {
      console.log('args', this, args);

      // this.webmonitor_xhr.data = args[0];

      on(this, 'loadend', function (this: any) {
        const eTime = getTimestamp();
        console.log('loadend', this);
        // 接口的执行时长
        this.webmonitor_xhr.elapsedTime = eTime - this.webmonitor_xhr.sTime;
        notify(EVENTTYPES.XHR, this.webmonitor_xhr);
      });

      originalSend.apply(this, args);
    };
  });
}
