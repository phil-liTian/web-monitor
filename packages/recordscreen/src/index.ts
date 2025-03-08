/*
 * @author: phil.li
 */
import type { SdkBase, RecordScreenOption } from '@webmonitor/types';
import { generateUUID, _support, validateOption } from '@webmonitor/utils';
import { EVENTTYPES } from '@webmonitor/common';
import { handleScreen } from './core/recordScreen';

export default class RecordScreen {
  // 默认录屏时长
  recordScreentime = 10;
  type: string;
  recordScreenTypeList: string[] = [
    EVENTTYPES.ERROR,
    EVENTTYPES.UNHANDLEDREJECTION,
    EVENTTYPES.RESOURCE,
    EVENTTYPES.XHR,
    EVENTTYPES.FETCH,
  ];

  constructor(params: RecordScreenOption) {
    this.type = EVENTTYPES.RECORDSCREEN;
    this.bindOptions(params);
  }

  bindOptions(params: RecordScreenOption) {
    const { recordScreenTime, recordScreenTypeList } = params;
    validateOption(recordScreenTime, 'recordScreenTime', 'number') &&
      (this.recordScreentime = recordScreenTime || 10);
    validateOption(recordScreenTypeList, 'recordScreenTypeList', 'array') &&
      (this.recordScreenTypeList = recordScreenTypeList || []);
  }

  core({ transportData, options }: SdkBase) {
    console.log('options', options);
    options.silentRecordScreen = true;
    options.recordScreenTypeList = this.recordScreenTypeList;
    _support.recordScreenTime = this.recordScreentime;
    // 添加初始的recordScreenId
    _support.recordScreenId = generateUUID();
    handleScreen(transportData, this.recordScreentime);
  }
}
