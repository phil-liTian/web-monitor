import { VueInstance, InitOptions } from '@webmonitor/types';
import { EVENTTYPES } from '@webmonitor/common';

declare function log({ message, error, type, }: {
    error: any;
    message: string;
    type: EVENTTYPES;
}): void;

declare function install(Vue: VueInstance, options: InitOptions): void;
declare function use(Plugin: any, option: any): void;
declare const _default: {
    install: typeof install;
    use: typeof use;
    log: typeof log;
};

export { _default as default };
