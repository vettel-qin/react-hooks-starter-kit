/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import loadScript from '~/core/loadScript';
import Defer from '~/core/defer';
import { wxAuth } from '~/api/scrm';

declare global {
  interface Window {
    wx?: any;
  }
}

export async function wxConfig() {
  const deferred = new Defer();
  await loadScript('//res.wx.qq.com/open/js/jweixin-1.3.2.js');

  const url = window.location.href.split('#')[0];
  const params = await wxAuth(process.env.REACT_APP_WECHAT_APPID!, url);
  window.wx.config({
    debug: false,
    appId: params.appId,
    timestamp: params.timestamp,
    nonceStr: params.nonceStr,
    signature: params.signature,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'scanQRCode', 'hideMenuItems'],
  });

  window.wx.ready(deferred.resolve);
  window.wx.error(deferred.reject);

  return deferred.promise;
}
