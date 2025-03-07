/*
 * @author: phil.li
 */
import { EVENTTYPES, HTTPTYPE } from '@webmonitor/common';
import type { ReplaceHandler, voidFunc } from '@webmonitor/types';
import {
  _global,
  getLocationHref,
  getTimestamp,
  replaceAop,
  throttleFn,
  veriableTypeDetection,
} from '@webmonitor/utils';
import { on, supportsHistory } from '@webmonitor/utils';
import { options } from './index';
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
    case EVENTTYPES.CLICK:
      domReplace();
      break;
    case EVENTTYPES.HASHCHANGE:
      listenHashChange();
      break;
    case EVENTTYPES.HISTORY:
      listenHistoryChange();
      break;
  }
}

export function addReplaceHandler(handler: ReplaceHandler) {
  if (!subscribeEvent(handler)) return;
  replace(handler.type);
}

// 错误处理 window.onerror, 可以捕获js语法错误
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
      on(this, 'loadend', function (this: any) {
        const { status } = this;
        const eTime = getTimestamp();
        this.webmonitor_xhr.time = this.webmonitor_xhr.sTime;
        this.webmonitor_xhr.Status = status;
        // 接口的执行时长
        this.webmonitor_xhr.elapsedTime = eTime - this.webmonitor_xhr.sTime;
        notify(EVENTTYPES.XHR, this.webmonitor_xhr);
      });

      originalSend.apply(this, args);
    };
  });
}

// 处理dom事件 点击
function domReplace(): void {
  if (!('document' in _global)) return;
  const clickThrottle = throttleFn(notify, options.throttleDelayTime);

  on(
    _global.document,
    'click',
    function (this: any) {
      // notify(EVENTTYPES.CLICK, this);
      clickThrottle(EVENTTYPES.CLICK, this);
    },
    true,
  );
}

function listenHashChange() {
  if (!('onhashchange' in _global)) return;
  on(_global, 'hashchange', function (e) {
    notify(EVENTTYPES.HASHCHANGE, e);
  });
}

let lastHref: string = getLocationHref();

function listenHistoryChange() {
  if (!supportsHistory()) return;

  const oldOnpopstate = _global.onpopstate;
  // console.log('oldOnpopstate', oldOnpopstate);

  function historyReplaceFn(originalHistoryFn: voidFunc) {
    return function (this: any, ...args: any) {
      const url = args.length > 2 ? args[2] : undefined;
      if (url) {
        const from = lastHref;
        const to = url;
        lastHref = to;
        notify(EVENTTYPES.HISTORY, {
          from,
          to,
        });
      }

      return originalHistoryFn.apply(this, args);
    };
  }

  _global.onpopstate = function (this, ...args: any) {
    console.log('aaa');
  };

  // 重写pushState & replaceState
  replaceAop(_global.history, 'pushState', historyReplaceFn);
  replaceAop(_global.history, 'replaceState', historyReplaceFn);
}
