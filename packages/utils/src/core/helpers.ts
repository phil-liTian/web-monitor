/*
 * @author: phil.li
 */
import type { CallBack, IAnyObject } from '@webmonitor/types';
import { error } from './error';
import { veriableTypeDetection } from './verifyType';

// 获取pageUrl
export function getLocationHref() {
  if (typeof document === 'undefined' || !document.location) return '';
  return document.location.href;
}

export function on(target: any, eventName: string, handler: CallBack, options = false) {
  target.addEventListener(eventName, handler, options);
}

export function typeOfAny(target: any): string {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

// 校验target是否是expectType类型，不是则报错
export function validateOption(target: any, targetName: string, expectType: string) {
  if (!target) return false;
  if (typeOfAny(target) === expectType) return true;
  error(`${targetName} 必须是 ${expectType} 类型`);
}

export function getTimestamp() {
  return Date.now();
}

/**
 * 替代对象中属性
 * @param source 源对象
 * @param name 需要修改的key
 * @param callback 修改的回调, 原来的值作为参数
 * @param isForce 强制替换
 * @returns
 */
export function replaceAop(
  source: IAnyObject,
  name: string,
  callback: CallBack,
  isForce: boolean = false,
) {
  if (!source) return;
  if (name in source || isForce) {
    const original = source[name];
    const wrapped = callback(original);
    if (typeof wrapped === 'function') {
      source[name] = wrapped;
    }
  }
}

// 截取字符串
export function interceptStr(str: string, len: number) {
  if (veriableTypeDetection.isString(str)) {
    return str.slice(0, len) + (str.length > len ? '...' : '');
  }

  return '';
}

// 节流函数
export function throttleFn(fn: CallBack, delay: number) {
  let timer: any = null;
  return function (this: any, ...args: any[]) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

// 防抖函数
export function debounceFn(fn: CallBack, delay: number) {
  let timer: any = null;
  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

// 创建一个唯一标识
export function generateUUID() {
  let d = new Date().getTime();

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

  return uuid;
}

export function unknownToString(target: unknown): string {
  if ( veriableTypeDetection.isString(target) ) {
    return target as string;
  } else if (veriableTypeDetection.isUndefined(target)) {
    return 'undefined';
  } 
  return JSON.stringify(target);
}
