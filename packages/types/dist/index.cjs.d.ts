import { EVENTTYPES, STATUSCODE, BREADCRUMBTYPES } from '@webmonitor/common';

interface VueInstance {
    [key: string]: any;
}
interface VueConfiguration {
    slient?: boolean;
    errorHandler: (err: Error, vm: ViewModel, info: string) => void;
}
interface ViewModel {
    [key: string]: any;
}

interface ReportData {
    type: EVENTTYPES;
    pageUrl: string;
    time: number;
    uuid: string;
    sdkVersion: string;
    breadcrumb?: BreadcrumbData[];
    recordScreenId?: string;
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
interface Window {
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
interface CallBack {
    (...args: any[]): void;
}
interface IAnyObject {
    [key: string]: any;
}
type voidFunc = (...args: any[]) => void;
interface ReplaceHandler {
    type: EVENTTYPES;
    callback: CallBack;
}
type ReplaceCallback = (data: any) => void;
interface ErrorTarget {
    target?: {
        localName?: string;
    };
    error?: any;
    message?: string;
}
interface ResourceTarget {
    src?: string;
    localName?: string;
    href?: string;
}
interface ResouceError {
    time: number;
    message: string;
    name: string;
}
interface HttpData {
    type?: string;
    url: string;
    Status?: number;
    status: string;
    message?: string;
    time?: number;
    elapsedTime?: number;
}
interface BreadcrumbData {
    type: EVENTTYPES;
    status: STATUSCODE;
    time: number;
    category?: BREADCRUMBTYPES;
    data: any;
}
interface RouteHistory {
    from: string;
    to: string;
}
interface SdkBase {
    transportData: any;
    breadcrumb: any;
    options: any;
    notify: any;
}
declare abstract class BasePlugin {
    type: string;
    constructor(type: string);
    abstract bindOptions(params: any): void;
    abstract core(sdk: SdkBase): void;
    abstract transform(data: any): any;
}

interface InitOptions {
    dsn: string;
    apikey: string;
    userId?: string;
    disabled?: boolean;
    slientXhr?: boolean;
    slientFetch?: boolean;
    slientError?: boolean;
    slientClick?: boolean;
    slientUnhanderRejection?: boolean;
    silentWhiteScreen?: boolean;
    slientHashChange?: boolean;
    slientHistoryChange?: boolean;
    repeatCodeError?: boolean;
    overTime?: number;
    throttleDelayTime?: number;
    skeletonProject?: boolean;
    whiteBoxElements?: string[];
    filterXhrUrlRegExp?: RegExp;
    maxBreadcrumbs?: number;
    boforePushBreadcrumb?: (data: ReportData) => Promise<ReportData | boolean>;
    getUserId?: () => string;
    beforeDataReport?: (data: ReportData) => Promise<ReportData | boolean>;
}
interface RecordScreenOption {
    recordScreenTypeList: string[];
    recordScreenTime: number;
}

export { BasePlugin, type BreadcrumbData, type CallBack, type ErrorTarget, type HttpData, type IAnyObject, type InitOptions, type RecordScreenOption, type ReplaceCallback, type ReplaceHandler, type ReportData, type ResouceError, type ResourceTarget, type RouteHistory, type SdkBase, type ViewModel, type VueConfiguration, type VueInstance, type Window, type voidFunc };
