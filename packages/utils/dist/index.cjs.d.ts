import { CallBack, IAnyObject, Window, InitOptions } from '@webmonitor/types';

declare function error(error: string): void;

declare function getLocationHref(): string;
declare function on(target: any, eventName: string, handler: CallBack, options?: boolean): void;
declare function typeOfAny(target: any): string;
declare function validateOption(target: any, targetName: string, expectType: string): boolean | undefined;
declare function getTimestamp(): number;
/**
 * 替代对象中属性
 * @param source 源对象
 * @param name 需要修改的key
 * @param callback 修改的回调, 原来的值作为参数
 * @param isForce 强制替换
 * @returns
 */
declare function replaceAop(source: IAnyObject, name: string, callback: CallBack, isForce?: boolean): void;
declare function interceptStr(str: string, len: number): string;
declare function throttleFn(fn: CallBack, delay: number): (this: any, ...args: any[]) => void;
declare function debounceFn(fn: CallBack, delay: number): (this: any, ...args: any[]) => void;
declare function generateUUID(): string;
declare function unknownToString(target: unknown): string;

declare function getGlobal(): Window;
declare const _global: Window;
declare const _support: {
    [key: string]: any;
};
declare function setFlag(replaceType: string, isSet: boolean): void;
declare function getFlag(replaceType: string): boolean;
declare function getGlobalSupport(): {
    [key: string]: any;
};
declare function supportsHistory(): boolean;

declare const veriableTypeDetection: {
    isString: (obj: any) => boolean;
    isNumber: (obj: any) => boolean;
    isUndefined: (obj: any) => boolean;
};
declare function isError(error: Error): boolean;

declare function htmlElementAsString(element: HTMLElement): string;
/**
 * input: https://www.doubao.com/chat?token=123&name=phil
 * {
 *  host: 'www.doubao.com',
 *  path: '/chat',
 *  protocol: 'https',
 *  relative: '/chat?token=123&name=phil'
 * }
 *
 * @param url
 * @returns
 */
declare function parseUrlToObj(url: string): {
    host?: undefined;
    path?: undefined;
    protocol?: undefined;
    relative?: undefined;
} | {
    host: string;
    path: string;
    protocol: string;
    relative: string;
};
declare function getErrorUid(input: string): string;
declare function hashMapExist(hash: string): boolean;
declare function setSilentFlag({ slientError, slientClick, slientFetch, slientXhr, slientUnhanderRejection, slientHashChange, slientHistoryChange, silentWhiteScreen }: InitOptions): void;

export { _global, _support, debounceFn, error, generateUUID, getErrorUid, getFlag, getGlobal, getGlobalSupport, getLocationHref, getTimestamp, hashMapExist, htmlElementAsString, interceptStr, isError, on, parseUrlToObj, replaceAop, setFlag, setSilentFlag, supportsHistory, throttleFn, typeOfAny, unknownToString, validateOption, veriableTypeDetection };
