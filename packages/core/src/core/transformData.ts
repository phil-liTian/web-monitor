/*
 * @author: phil.li
 */
import { HTTPCODE, STATUSCODE } from '@webmonitor/common';
import type { HttpData, ResouceError, ResourceTarget } from '@webmonitor/types';
import { fromHttpStatus } from '@webmonitor/utils/src/core/httpStatus';
import { _support, getTimestamp, interceptStr } from '@webmonitor/utils';

// 转化http请求的异常信息
export function httpTransform(data: HttpData): HttpData {
  const { Status = 200, time, elapsedTime = 0 } = data;
  let status: STATUSCODE = STATUSCODE.OK;
  let message: any = '';

  if (Status === 0) {
    status = STATUSCODE.ERROR;
    message = elapsedTime > _support.options.overTime ? '请求超时' : `请求失败, 状态为${Status}`;
  } else if (Status < HTTPCODE.BAD_REQUEST) {
    // 请求成功
    status = STATUSCODE.OK;
  } else {
    status = STATUSCODE.ERROR;
    message = `http请求失败, Status值为${Status}, ${fromHttpStatus(Status)}`;
  }

  message = `${data.url}, ${message}`;

  return {
    url: data.url,
    status,
    message,
    time,
  };
}

// 转化资源加载错误的异常信息
export function resourceTransform(target: ResourceTarget): ResouceError {
  return {
    time: getTimestamp(),
    name: target.localName || '',
    message: interceptStr(target.src || target.href || '', 120) + ', 资源加载失败',
  };
}
