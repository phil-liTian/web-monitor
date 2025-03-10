/*
 * @author: phil.li
 */
import { BREADCRUMBTYPES, EVENTTYPES, STATUSCODE } from '@webmonitor/common';
export interface ReportData {
  type: EVENTTYPES; // 事件类型
  pageUrl: string; // 页面地址
  time: number; // 发生时间
  uuid: string; // 页面唯一标识
  sdkVersion: string; // sdk版本号
  breadcrumb?: BreadcrumbData[]; // 用户行为栈信息
  recordScreenId?: string; // 录屏id
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
  onpopstate: any;
  addEventListener: any;
  innerWidth: number;
  innerHeight: number;
  performance: any;
  chrome: {
    app: {
      [key: string]: any;
    };
  };

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

export interface BreadcrumbData {
  type: EVENTTYPES; // 事件类型
  status: STATUSCODE; // 用户行为状态
  time: number; // 发生时间
  category?: BREADCRUMBTYPES; // 用户行为类型
  data: any;
}

export interface RouteHistory {
  from: string;
  to: string;
}

// sdk插件核心core
export interface SdkBase {
  transportData: any; // 数据上报
  breadcrumb: any; // 用户行为
  options: any; // 公共配置
  notify: any; // 发布消息
}

export abstract class BasePlugin {
  public type: string; // 插件类型
  constructor(type: string) {
    this.type = type;
  }
  abstract bindOptions(params: any): void; // 绑定配置
  abstract core(sdk: SdkBase): void; // 核心方法
  abstract transform(data: any): any; // 数据转化
}
