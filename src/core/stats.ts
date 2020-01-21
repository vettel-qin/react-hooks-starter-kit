import loadScript from './loadScript';

declare global {
  interface Window {
    _hmt: any[];
  }
}

/**
 * 百度统计代码
 */
window._hmt = window._hmt || [];
window._hmt.push(['_setAutoPageview', false]);
loadScript(`https://hm.baidu.com/hm.js?${process.env.REACT_APP_BD_STATISTISC}`);

export function trackPageView(...params: any[]) {
  if (__DEV__) {
    if (!params || params.length === 0) {
      console.error('PV/UV统计: 页面地址不能为空');
    } else if (params.length > 1) {
      console.warn(`PV/UV统计: ${params[0]}，其余参数将被省略`);
    } else {
      console.info(`PV/UV统计: ${params[0]}`);
    }
  }
  window._hmt.push(['_trackPageview', ...params]);
}

export function trackEvent(...params: any[]) {
  if (__DEV__) {
    if (!params) {
      console.error('事件跟踪: 事件标签不能为空');
    } else if (params.length > 3) {
      console.error('事件跟踪: 事件标签数量不能超过3个');
    } else {
      console.info(`事件跟踪: ${JSON.stringify(params.slice(0, 3))}`);
    }
  }
  window._hmt.push(['_trackEvent', ...params]);
}
