/*
 * @author: phil.li
 */
/*
 * @author: phil.li
 */
import { EVENTTYPES } from '@webmonitor/common';
export interface ReportData {
  type: string; // 事件类型
  pageUrl: string; // 页面地址
  time: number; // 发生时间
  uuid: string; // 页面唯一标识
  sdkVersion: string; // sdk版本号
  deviceInfo: {
    browserVersion: string;
    browserName: string;
    osVersion: string;
    osName: string;
    ua: string;
    device: string;
    deviceType: string;
    deviceVendor: string;
  };
}

export interface Window {
  history: any;
  __webMonitor__: {
    [key: string]: any;
  };
}

export interface CallBack {
  (...args: any[]): void;
}

export interface IAnyObject {
  [key: string]: any;
}

export type voidFunc = (...args: any[]) => void;

export interface ReplaceHandler {
  type: EVENTTYPES;
  callback: CallBack;
}

export type ReplaceCallback = (data: any) => void;

export interface ErrorTarget {
  target?: {
    localName?: string;
  };
  error?: any;
  message?: string;
}

export interface ResourceTarget {
  src?: string;
  localName?: string;
  href?: string;
}

export interface ResouceError {
  time: number;
  message: string; // 加载失败的信息
  name: string; // 脚本类型：js脚本
}

export interface HttpData {
  type?: string;
  url: string;
  Status?: number; // 接口状态编码
  status: string; // 接口状态
  message?: string; // 接口信息
  time?: number; // 接口耗时
  elapsedTime?: number;
}
