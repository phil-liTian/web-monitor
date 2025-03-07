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
}
