/*
 * @author: phil.li
 */
import { InitOptions } from '@webmonitor/types';
import { _support, setFlag } from './global'
import { EVENTTYPES } from '@webmonitor/common';
export function htmlElementAsString(element: HTMLElement): string {
  const tagName = element.tagName.toLowerCase();
  if (tagName === 'body') return '';
  let classNames = element.classList.value;
  classNames = classNames ? ` class="${classNames}"` : '';
  const id = element.id ? ` id="${element.id}"` : '';
  const innerText = element.innerText;

  return `<${tagName}${id}${classNames}>${innerText}</${tagName}>`;
}

/**
 * input: https://www.doubao.com/chat?token=123&name=phil
 * {
 *  host: 'www.doubao.com',
 *  path: '/chat',
 *  protocol: 'https',
 *  relative: '/chat?token=123&name=phil'
 * }
 *
 * @param url
 * @returns
 */
export function parseUrlToObj(url: string) {
  if (!url) return {};

  const match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
  if (!match) {
    return {};
  }
  const query = match[6] || '';
  const fragment = match[8] || '';
  return {
    host: match[4],
    path: match[5],
    protocol: match[2],
    relative: match[5] + query + fragment,
  };
}


// 每个错误生成一个唯一的id， 根据错误内容生成一个唯一的base64编码
export function getErrorUid(input: string): string {
  return window.btoa(encodeURIComponent(input));
}


// 处理相同的错误只上传一次的逻辑
export function hashMapExist(hash: string): boolean {
  const exist = _support.errorMap.has(hash);
  if (!exist) {
    _support.errorMap.set(hash, true);
  }
  return exist;
}

export function setSilentFlag({
  slientError = true,
  slientClick = true,
  slientFetch = true,
  slientXhr = true,
  slientUnhanderRejection = true,
  slientHashChange = true,
  slientHistoryChange = true,
  silentWhiteScreen = true
}: InitOptions) {
  setFlag(EVENTTYPES.CLICK, !slientClick)
  setFlag(EVENTTYPES.ERROR, !slientError)
  setFlag(EVENTTYPES.FETCH, !slientFetch)
  setFlag(EVENTTYPES.XHR, !slientXhr)
  setFlag(EVENTTYPES.UNHANDLEDREJECTION, !slientUnhanderRejection)
  setFlag(EVENTTYPES.HASHCHANGE, !slientHashChange)
  setFlag(EVENTTYPES.HISTORY, !slientHistoryChange)
  setFlag(EVENTTYPES.WHITESCREEN,!silentWhiteScreen)
}
