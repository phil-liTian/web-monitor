import { RecordScreenOption, SdkBase } from '@webmonitor/types';

declare class RecordScreen {
    recordScreentime: number;
    type: string;
    recordScreenTypeList: string[];
    constructor(params: RecordScreenOption);
    bindOptions(params: RecordScreenOption): void;
    core({ transportData, options }: SdkBase): void;
}

export { RecordScreen as default };
