/*
 * @author: phil.li
 */
import { onLCP, onFID, onCLS, onFCP, onTTFB } from 'web-vitals';
import { on, _global, getTimestamp } from '@webmonitor/utils';
import type { CallBack } from '@webmonitor/types';

// 页面是否渲染完成
let isOnLoaded = false;
let observer: MutationObserver;
let entries: any[] = [];
let firstScreenPaint = 0; // 首屏渲染时间
let timer: number;

const viewportWidth = _global.innerWidth;
const viewportHeight = _global.innerHeight;

function getRenderTime() {
  let startTime = 0;
  entries.map(entry => {
    startTime = Math.max(startTime, entry.startTime);
  });

  return startTime - performance.timing.navigationStart;
}

function checkDOMChange(callback: CallBack) {
  cancelAnimationFrame(timer);

  timer = requestAnimationFrame(() => {
    if (document.readyState === 'complete') {
      isOnLoaded = true;
    }

    if (isOnLoaded) {
      observer && observer.disconnect();
      entries = [];
      firstScreenPaint = getRenderTime();
      callback && callback(firstScreenPaint);
    } else {
      checkDOMChange(callback);
    }
  });
}

// 判断dom是否在屏幕内
function isInScreen(element: any) {
  const rectInfo = element.getBoundingClientRect();

  return rectInfo.left < viewportWidth && rectInfo.top <= viewportHeight;
}

function getFirstScreenPaint(callback: CallBack) {
  if ('requestIdleCallback' in _global) {
    requestIdleCallback(deadline => {
      if (deadline.timeRemaining() > 0) {
        observeFirstScreenPaint(callback);
      }
    });
  } else {
    observeFirstScreenPaint(callback);
  }
}

// TODO: 如何监听首屏渲染时间？？？
function observeFirstScreenPaint(callback: CallBack) {
  const ignoreDOMList = ['SCRIPT', 'STYLE', 'LINK'];
  observer = new MutationObserver((mutationsList: any) => {
    checkDOMChange(callback);
    const entry = { children: [], startTime: 0 };
    for (const mutation of mutationsList) {
      if (mutation.addedNodes.length && isInScreen(mutation.target)) {
        for (const node of mutation.addedNodes) {
          // 忽略一些dom节点，只处理元素节点
          if (node.nodeType === 1 && !ignoreDOMList.includes(node.nodeName) && isInScreen(node)) {
            entry.children.push(node as never);
          }
        }
      }
    }

    if (entry.children.length) {
      entries.push(entry);
      entry.startTime = getTimestamp();
    }
  });

  observer.observe(document, {
    childList: true, // 监听添加或删除子节点
    subtree: true, // 监听整个子树
    characterData: true, // 监听元素的文本是否变化
    attributes: true, // 监听元素的属性是否变化
  });
}

export function isSafari(): boolean {
  return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
}
// const observer = new PerformanceObserver()

// 计算服务端首字节响应的时间指标
export function getTTFB(callback: CallBack) {
  on(_global, 'load', () => {
    // 即将被弃用
    const { responseStart, navigationStart } = _global.performance.timing;

    const value = responseStart - navigationStart;
    callback({
      name: 'TTFB',
      value,
      rating: value > 100 ? 'poor' : 'good',
    });
  });
}

// 首个内容渲染时间
export function getFCP(callback: CallBack) {
  const entryHandler = (list: any) => {
    for (let entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        observer.disconnect();
        callback({
          name: `FCP`,
          value: entry.startTime,
          rating: entry.startTime > 2500 ? 'poor' : 'good',
        });
      }
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'paint', buffered: true });
}

// 最大内容绘制的时间
export function getLCP(callback: CallBack): void {
  const entryHandler = (list: any) => {
    for (let entry of list.getEntries()) {
      if (entry.name === 'largest-contentful-paint') {
        observer.disconnect();
        callback({
          name: `LCP`,
          value: entry.startTime,
          rating: entry.startTime > 2500 ? 'poor' : 'good',
        });
      }
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'largest-contentful-paint', buffered: true });
}

export function getCLS(callback: CallBack): void {
  const entryHandler = (list: any) => {
    // TODO
    callback(list.getEntries()[0]);
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'layout-shift', buffered: true });
}

export function getFID(callback: CallBack): void {
  const entryHandler = (list: any) => {
    for (const entry of list.getEntries()) {
      observer.disconnect();
      const value = entry.processingStart - entry.startTime;

      callback({
        value,
        name: 'FID',
        rating: value > 100 ? 'poor' : 'good',
      });
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'first-input', buffered: true });
}

export function getWebVitals(callback: CallBack): void {
  if (isSafari()) {
    // web-vitals 不兼容safari浏览器
    console.log('我是safari');
    getTTFB(res => {
      callback(res);
    });

    getFCP(res => {
      callback(res);
    });

    getLCP(res => {
      callback(res);
    });

    getCLS(res => {
      callback(res);
    });

    getFID(res => {
      callback(res);
    });
  } else {
    // 最大内容绘制，指浏览器渲染页面中最大的文本或图像等元素的时间点
    onLCP(res => {
      console.log('res', res);

      callback(res);
    });

    // 首次输入延迟，是指从用户首次与页面进行交互（例如点击链接、按钮等）到浏览器能够响应该交互的时间间隔
    onFID(res => {
      console.log('res', res);
      callback(res);
    });

    // 累积布局偏移，用于衡量页面加载过程中发生的视觉布局不稳定情况，即页面元素意外移动的程度。
    onCLS(res => {
      console.log('res', res);
      callback(res);
    });

    // 首次内容绘制，是指浏览器首次将任何文本、图像、SVG 等内容渲染到屏幕上的时间。
    onFCP(res => {
      console.log('res', res);
      callback(res);
    });

    // 首字节时间 是指从浏览器发起请求到接收到服务器响应的第一个字节所花费的时间
    onTTFB(res => {
      console.log('res', res);
      callback(res);
    });
  }

  // 获取首屏渲染时间
  getFirstScreenPaint(res => {
    const data = {
      name: 'FSP',
      value: res,
      rating: res > 2500 ? 'poor' : 'good',
    };
    callback(data);
  });
}
