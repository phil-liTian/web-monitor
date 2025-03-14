import { BasePlugin, SdkBase } from '@webmonitor/types';

declare class WebPerformance extends BasePlugin {
    constructor();
    bindOptions(params: any): void;
    core({ transportData }: SdkBase): void;
    transform(data: any): any;
}

export { WebPerformance as default };
