/*
 * @author: phil.li
 */
import type { CallBack, IAnyObject } from '@webmonitor/types';
import { error } from './error';

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
