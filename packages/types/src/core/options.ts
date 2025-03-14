import { ReportData } from "./base";

/*
 * @author: phil.li
 */
export interface InitOptions {
  dsn: string; // 错误上报的dsn地址
  apikey: string; // 项目唯一标识
  userId?: string; // 用户唯一标识
  disabled?: boolean; // 是否禁用监控
  slientXhr?: boolean; // 是否禁用xhr监控
  slientFetch?: boolean; // 是否禁用fetch监控
  slientError?: boolean; // 是否禁用错误监控
  slientClick?: boolean; // 是否禁用点击监控
  slientUnhanderRejection?: boolean; // 是否禁用未处理的promise rejection监控
  silentWhiteScreen?: boolean; // 是否禁用白屏监控
  slientHashChange?: boolean; // 是否监听hash变化
  slientHistoryChange?: boolean; // 是否监听history变化
  repeatCodeError?: boolean; // 是否去除重复的错误代码
  overTime?: number; // 超时时间
  throttleDelayTime?: number; // 防抖延迟执行时间
  skeletonProject?: boolean; // 是否开启骨架屏
  whiteBoxElements?: string[]; // 容器列表 默认['html', 'body', '#app', '#root']
  filterXhrUrlRegExp?: RegExp; // 过滤请求的url
  maxBreadcrumbs?: number; // 最大的面包屑数
  boforePushBreadcrumb?: (data: ReportData) => Promise<ReportData | boolean>; // 面包屑上报前的回调
  getUserId?: () => string; // 用户唯一标识
  beforeDataReport?: (data: ReportData) => Promise<ReportData | boolean>;
}

export interface RecordScreenOption {
  recordScreenTypeList: string[];
  recordScreenTime: number;
}
