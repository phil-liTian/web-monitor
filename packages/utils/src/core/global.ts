/*
 * @author: phil.li
 */
import type { Window } from '@webmonitor/types';
export function getGlobal(): Window {
  return window as unknown as Window;
}

const _global = getGlobal();
const _support = getGlobalSupport();

export function getGlobalSupport() {
  _global.__webMonitor__ = {};
  return _global.__webMonitor__;
}

export { _support, _global };
