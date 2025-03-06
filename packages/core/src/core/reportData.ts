/*
 * @author: phil.li
 */
import type { InitOptions, ReportData } from '@webmonitor/types';
import { validateOption, _support } from '@webmonitor/utils';
export class TransportData {
  uuid: string;
  errorDsn: string = ''; // 错误上报的dsn
  constructor() {
    // 每次页面加载的唯一标识
    this.uuid = '1234567890';
  }
  beacon(url: string, data: any): boolean {
    return navigator.sendBeacon(url, JSON.stringify(data));
  }

  bindOptions(options: InitOptions) {
    const { dsn } = options;
    validateOption(dsn, 'dsn', 'string') && (this.errorDsn = options.dsn);
  }

  send(data: ReportData) {
    const dsn = this.errorDsn;
    const value = this.beacon(dsn, data);
  }
}

const transportData = _support.transportData || (_support.transportData = new TransportData());

export { transportData };
