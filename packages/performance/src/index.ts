/*
 * @author: phil.li
 */
import type { SdkBase } from '@webmonitor/types';
import { BasePlugin } from '@webmonitor/types';
import { EVENTTYPES, STATUSCODE } from '@webmonitor/common';
import { getWebVitals } from './core/performance';
import { _global, getTimestamp, on } from '@webmonitor/utils';
// 前端性能指标：LCP、FID、CLS、TBT、TTI、FCP、TTFB
// 性能分析
export default class WebPerformance extends BasePlugin {
  constructor() {
    super(EVENTTYPES.PERFORMANCE);
  }

  bindOptions(params: any): void {
    console.log('params', params);
  }

  core({ transportData }: SdkBase) {
    getWebVitals(res => {
      // name 指标名称 rating 指标等级 value 指标数值
      const { name, rating, value } = res;
      transportData.send({
        type: EVENTTYPES.PERFORMANCE,
        status: STATUSCODE.OK,
        time: getTimestamp(),
        name,
        rating,
        value,
      });
    });

    // 长任务详情
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();

      for (const long of entries) {
        transportData.send({
          type: EVENTTYPES.PERFORMANCE,
          name: 'longTask',
          status: STATUSCODE.OK,
          time: getTimestamp(),
          longTask: long,
        });
      }
    });
    observer.observe({ entryTypes: ['longtask'] });

    on(_global, 'load', () => {
      // 内存使用
      if ((performance as any).memory) {
        transportData.send({
          type: EVENTTYPES.PERFORMANCE,
          name: 'memory',
          status: STATUSCODE.OK,
          time: getTimestamp(),
          memory: {
            ...((performance as any).memory || {}),
          },
        });
      }
    });
  }
  transform(data: any) {
    return data;
  }
}
