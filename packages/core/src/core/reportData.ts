/*
 * @author: phil.li
 */
import type { InitOptions, ReportData } from '@webmonitor/types';
import { validateOption, _support, getLocationHref, error } from '@webmonitor/utils';
import { EVENTTYPES, SDK_VERSION } from '@webmonitor/common';
import { breadcrumb } from './breadCrumb';
export class TransportData {
  uuid: string;
  userId: string = ''; // 用户id
  apikey: string = ''; // 项目唯一标识
  errorDsn: string = ''; // 错误上报的dsn
  getUserId?: () => string; // 用户自定义获取userId的方法
  constructor() {
    // 每次页面加载的唯一标识
    this.uuid = '1234567890';
  }
  beacon(url: string, data: any): boolean {
    return navigator.sendBeacon(url, JSON.stringify(data));
  }

  getAuthId() {
    if (typeof this.getUserId === 'function') {
      const id = this.getUserId();
      if (typeof id === 'string') {
        return id;
      }
      return error('getUserId must return string');
    }
    return '';
  }

  getAuthInfo() {
    return {
      userId: this.userId || this.getAuthId(),
      apikey: this.apikey,
      sdkVersion: SDK_VERSION,
    };
  }

  // 添加一些公共的信息
  getTransportData(data: ReportData): ReportData {
    const info = {
      ...data,
      ...this.getAuthInfo(),
      pageUrl: getLocationHref(),
      deviceInfo: _support.deviceInfo, // 获取设备信息
    };

    // 记录客户调用栈的信息, 性能数据、录屏、白屏检测等不需要附带用户行为
    const ExcludeBreadcrumbTypes = [
      EVENTTYPES.PERFORMANCE,
      EVENTTYPES.RECORDSCREEN,
      EVENTTYPES.WHITESCREEN,
    ];

    if (!ExcludeBreadcrumbTypes.includes(data.type)) {
      info.breadcrumb = breadcrumb.getStack();
    }

    return info;
  }

  beforePost(data: ReportData) {
    const transportData = this.getTransportData(data);
    return transportData;
  }

  bindOptions(options: InitOptions) {
    const { dsn, userId, apikey, getUserId } = options;
    validateOption(dsn, 'dsn', 'string') && (this.errorDsn = options.dsn);
    validateOption(userId, 'userId', 'string') && (this.userId = userId || '');
    validateOption(apikey, 'apikey', 'string') && (this.apikey = apikey || '');
    validateOption(getUserId, 'getUserId', 'function') && (this.getUserId = getUserId);
  }

  send(data: ReportData) {
    const dsn = this.errorDsn;
    const result = this.beforePost(data);
    const value = this.beacon(dsn, result);
    if (!value) {
    }
  }
}

const transportData = _support.transportData || (_support.transportData = new TransportData());

export { transportData };
