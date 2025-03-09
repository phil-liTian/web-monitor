/*
 * @author: phil.li
 */
export interface InitOptions {
  dsn: string; // 错误上报的dsn地址
  apikey: string; // 项目唯一标识
  userId?: string; // 用户唯一标识
  getUserId?: () => string; // 用户唯一标识
  overTime?: number; // 超时时间
  throttleDelayTime?: number; // 防抖延迟执行时间
  skeletonProject?: boolean; // 是否开启骨架屏
  whiteBoxElements?: string[]; // 容器列表 默认['html', 'body', '#app', '#root']
}

export interface RecordScreenOption {
  recordScreenTypeList: string[];
  recordScreenTime: number;
}
