/*
 * @author: phil.li
 */
import { STATUSCODE } from '@webmonitor/common';
import { HttpData } from '@webmonitor/types';
import { fromHttpStatus } from '@webmonitor/utils/src/core/httpStatus';

export function httpTransform(data: HttpData): HttpData {
  const { Status = 200 } = data;
  let status: STATUSCODE = STATUSCODE.OK;
  let message: any = '';

  if (Status === 0) {
  } else {
    status = STATUSCODE.ERROR;
    message = `http请求失败, Status值为${Status}, ${fromHttpStatus(Status)}`;
  }

  message = `${data.url}, ${message}`;

  return {
    url: data.url,
    status,
    message,
  };
}
