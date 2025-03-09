/*
 * @author: phil.li
 */
import { STATUSCODE } from '@webmonitor/common';
import type { CallBack, InitOptions } from '@webmonitor/types';
import { _global, _support } from '@webmonitor/utils';

/**
 * 监听页面白屏
 * @param callback
 * @param options
 * skeletonProject 是否开启骨架屏
 * whiteBoxElements 容器列表 默认 ['html', 'body', '#app', '#root']
 */
export function openWhiteScreen(
  callback: CallBack,
  { skeletonProject, whiteBoxElements }: InitOptions,
) {
  let _whiteLoopNum = 0;
  let _skeletonInitList: any[] = []; // 存储初次采样点
  let _skeletonNowList: any[] = []; // 存储当前采样点

  if (skeletonProject) {
    // 有骨架屏
    if (document.readyState !== 'complete') {
      idleCallback();
    }
  } else {
    // 无骨架屏
    if (document.readyState === 'complete') {
      idleCallback();
    } else {
      _global.addEventListener('load', idleCallback);
    }
  }

  function getSelector(element: any) {
    if (element.id) {
      return `#${element.id}`;
    } else if (element.className) {
      return `.${element.className}`;
    } else {
      return element.nodeName.toLowerCase();
    }
  }

  // 判断采样节点是否是白屏节点
  function isContainer(element: HTMLElement): boolean {
    const selector = getSelector(element);
    if (skeletonProject) {
      // 有骨架屏
      _whiteLoopNum ? _skeletonNowList.push(selector) : _skeletonInitList.push(selector);
    }

    return whiteBoxElements!.includes(selector);
  }

  // 采样对比
  function sampling() {
    let emptyPoints = 0;

    for (let i = 1; i <= 9; i++) {
      const xElements = document.elementsFromPoint(
        (_global.innerWidth * i) / 10,
        _global.innerHeight / 2,
      );
      const yElements = document.elementsFromPoint(
        _global.innerWidth / 2,
        (_global.innerHeight * i) / 10,
      );

      if (isContainer(xElements[0] as HTMLElement)) emptyPoints++;

      // 中心点只需要计算一次
      if (i !== 5) {
        if (isContainer(yElements[0] as HTMLElement)) emptyPoints++;
      }
    }

    if (emptyPoints !== 17) {
      if (skeletonProject) {
        // 有骨架屏
        if (!_whiteLoopNum) return openWhiteLoop();
        // 比较前后dom是否一致
        if (_skeletonInitList.join('') == _skeletonNowList.join('')) {
          return callback({
            status: STATUSCODE.ERROR,
          });
        }
      }

      if (_support._loopTimer) {
        clearInterval(_support._loopTimer);
        _support._loopTimer = null;
      }
    } else {
      if (_support._loopTimer) return;
      // 17个点全在白屏容器内
      openWhiteLoop();
    }

    // 17个点全在白屏容器内 算是白屏
    callback({
      status: emptyPoints === 17 ? STATUSCODE.ERROR : STATUSCODE.OK,
    });
  }

  // 开启白屏轮循
  function openWhiteLoop() {
    if (_support._loopTimer) return;
    _support._loopTimer = setInterval(() => {
      if (skeletonProject) {
        // 有骨架屏
        _whiteLoopNum++;
        _skeletonNowList = [];
      }

      idleCallback();
    }, 1000);
  }

  function idleCallback() {
    if ('requestIdleCallback' in _global) {
      requestIdleCallback(deadline => {
        // timeRemaining：表示当前空闲时间的剩余时间
        if (deadline.timeRemaining() > 0) {
          sampling();
        }
      });
    } else {
      sampling();
    }
  }
}
