/*
 * @author: phil.li
 */
/*
 * @author: phil.li
 */
import { UAParser } from 'ua-parser-js';
import type { Window } from '@webmonitor/types';
export function getGlobal(): Window {
  return window as unknown as Window;
}

const _global = getGlobal();
const _support = getGlobalSupport();

const uaResult = new UAParser().getResult();

// 获取设备信息
_support.deviceInfo = {
  browserVersion: uaResult.browser.version,
  browserName: uaResult.browser.name,
  osVersion: uaResult.os.version,
  osName: uaResult.os.name,
  ua: uaResult.ua,
  device: uaResult.device.model || 'Unkown', // 设备的具体型号
  deviceType: uaResult.device.type || 'Pc', // 设备类型
  deviceVendor: uaResult.device.vendor || 'Unkown', // 设备厂商
};

_support.hasError = false;

export function getGlobalSupport() {
  _global.__webMonitor__ = {};
  return _global.__webMonitor__;
}

export function supportsHistory(): boolean {
  const chrome = _global.chrome;
  const isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
  const hasHistoryApi =
    'history' in _global && !!_global.history.pushState && !!_global.history.replaceState;

  return !isChromePackagedApp && hasHistoryApi;
}

export { _support, _global };
