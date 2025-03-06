/*
 * @author: phil.li
 */
import { EVENTTYPES } from "@webmonitor/common";
import type { ReplaceCallback, ReplaceHandler } from "@webmonitor/types";

const handlers: { [key in EVENTTYPES]?: ReplaceCallback[] } = {};

// 订阅事件
export function subscribeEvent(handler: ReplaceHandler): boolean {
  handlers[handler.type] = handlers[handler.type] || []
  handlers[handler.type]?.push(handler.callback)
  return true
}

// 发布事件
export function notify(type: EVENTTYPES, data?: any) {
  if ( !type || !handlers[type]) return
  handlers[type]?.forEach(callback => {
    try {
      callback(data);
    } catch (error) {
      console.log('webmonitor notify error', error);
    }
  })
}
