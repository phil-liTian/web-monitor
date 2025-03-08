/*
 * @author: phil.li
 */
import ErrorStackParser from 'error-stack-parser';
import type { ErrorTarget, HttpData, RouteHistory } from '@webmonitor/types';
import { options, transportData } from './index';
import { EVENTTYPES, STATUSCODE } from '@webmonitor/common';
import { getTimestamp, htmlElementAsString, parseUrlToObj } from '@webmonitor/utils';
import { httpTransform, resourceTransform } from './transformData';
import { breadcrumb } from './breadCrumb';
const HandleEvents = {
  // js 语法错误 或者 vue捕获到的错误
  handleError(event: ErrorTarget): void {
    const target = event.target;
    if (!target || (target && !target.localName)) {
      const stackFrame = ErrorStackParser.parse(!target ? event : event.error)[0];
      const { columnNumber, lineNumber, fileName } = stackFrame;
      const errorData = {
        type: EVENTTYPES.ERROR,
        status: STATUSCODE.ERROR,
        message: event.message,
        time: getTimestamp(),
        fileName,
        line: lineNumber,
        col: columnNumber,
      };

      // 错误行为操作栈
      breadcrumb.push({
        type: EVENTTYPES.ERROR,
        data: errorData,
        category: breadcrumb.getCategory(EVENTTYPES.ERROR),
        time: getTimestamp(),
        status: STATUSCODE.ERROR,
      });

      transportData.send(errorData);
    }

    // 资源加载错误
    if (target?.localName) {
      const data = resourceTransform(target);
      breadcrumb.push({
        type: EVENTTYPES.ERROR,
        data,
        category: breadcrumb.getCategory(EVENTTYPES.RESOURCE),
        time: getTimestamp(),
        status: STATUSCODE.ERROR,
      });

      transportData.send({
        ...data,
        type: EVENTTYPES.RESOURCE,
        status: STATUSCODE.ERROR,
      });
    }
  },

  // promise 错误, reject的异常不需要处理
  handleUnhandledrejection(ev: PromiseRejectionEvent): void {
    if (!ev.reason) return;
    const stackFrame = ErrorStackParser.parse(ev.reason)[0];
    const { lineNumber, columnNumber, fileName } = stackFrame;
    const message = ev.reason.message || ev.reason.stack;
    const data = {
      type: EVENTTYPES.UNHANDLEDREJECTION,
      status: STATUSCODE.ERROR,
      time: getTimestamp(),
      fileName,
      message,
      line: lineNumber,
      col: columnNumber,
    };

    breadcrumb.push({
      type: EVENTTYPES.UNHANDLEDREJECTION,
      data,
      category: breadcrumb.getCategory(EVENTTYPES.UNHANDLEDREJECTION),
      time: getTimestamp(),
      status: STATUSCODE.ERROR,
    });

    transportData.send(data);
  },

  // 处理http api请求
  handleHttp(data: HttpData) {
    const result = httpTransform(data);
    // 自身上报接口不计入用户行为栈中
    if (!result.url.includes(options.dsn)) {
      breadcrumb.push({
        type: EVENTTYPES.XHR,
        data: result,
        category: breadcrumb.getCategory(EVENTTYPES.XHR),
        time: getTimestamp(),
        status: result.status,
      });
    }

    if (result.status === STATUSCODE.ERROR) {
      // 上报错误接口
      transportData.send(result);
    }
  },

  // 记录用户点击行为
  handleClick(event: any) {
    const htmlStr = htmlElementAsString(event.activeElement);

    if (htmlStr) {
      breadcrumb.push({
        type: EVENTTYPES.CLICK,
        status: STATUSCODE.OK,
        time: getTimestamp(),
        data: htmlStr,
        category: breadcrumb.getCategory(EVENTTYPES.CLICK),
      });
    }
  },

  // 处理hash路由改变
  handleHashChange(data: HashChangeEvent) {
    const { oldURL, newURL } = data;
    const { relative: to } = parseUrlToObj(newURL);
    const { relative: from } = parseUrlToObj(oldURL);
    if (to === from) return;

    breadcrumb.push({
      type: EVENTTYPES.HASHCHANGE,
      status: STATUSCODE.OK,
      time: getTimestamp(),
      data: {
        from,
        to,
      },
      category: breadcrumb.getCategory(EVENTTYPES.HASHCHANGE),
    });
  },

  // 监听history路由变化
  handleHistory(data: RouteHistory) {
    const { from, to } = data;
    const { relative: parsedTo } = parseUrlToObj(to);
    const { relative: parsedFrom } = parseUrlToObj(from);
    if (parsedTo === parsedFrom) return;
    breadcrumb.push({
      type: EVENTTYPES.HISTORY,
      status: STATUSCODE.OK,
      time: getTimestamp(),
      data: {
        from: parsedFrom || '/',
        to: parsedTo || '/',
      },
      category: breadcrumb.getCategory(EVENTTYPES.HISTORY),
    });
  },
};

export { HandleEvents };
