/*
 * @author: phil.li
 */
import ErrorStackParser from 'error-stack-parser';
import type { ErrorTarget, HttpData } from '@webmonitor/types';
import { transportData } from './index';
import { EVENTTYPES, STATUSCODE } from '@webmonitor/common';
import { getTimestamp } from '@webmonitor/utils';
import { httpTransform } from './transformData';
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

      transportData.send(errorData);
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
    transportData.send(data);
  },

  // 处理http api请求
  handleHttp(data: HttpData) {
    console.log('data---->', data);
    const result = httpTransform(data);

    if (result.status === STATUSCODE.ERROR) {
      // 上报错误接口
      transportData.send(result);
    }
  },
};

export { HandleEvents };
