/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import { Request, middlewares } from '~/core/request';

const request = new Request(
  {
    baseUrl: process.env.REACT_APP_API_SCRM,
    mode: 'cors',
    type: 'json',
  },
  [middlewares.timeout, middlewares.http, middlewares.json, middlewares.baseUrl, middlewares.params, middlewares.type],
);

export interface UserInfo {
  /**
   * 会员ID
   */
  memberId: number;
  /**
   * 登录类型
   */
  identityType: 'WECHAT_YYJ';
  /**
   * 微信OpenID
   */
  identity: string;
  /**
   * 微信UnionID
   */
  unionid: string;
  /**
   * JWT Token
   */
  authToken: string;
  /**
   * 会员名称
   */
  memberName: string;
  /**
   * 昵称
   */
  nickName: string;
  /**
   * 会员手机号
   */
  mobilePhone: string;
  /**
   * 性别
   *  0：未知
   *  1：男
   *  2：女
   */
  gender: 0 | 1 | 2;
  /**
   * 生日（YYYY-MM-dd）
   */
  birthday: string;
  /**
   * 用户类型
   *  0：粉丝
   *  1：消费者
   *  2：内部人员
   *  3：同时是消费者和内部人员
   */
  memberType: 0 | 1 | 2 | 3;
  /**
   * 用户头像（URL）
   */
  headimg: string;
  /**
   * 省份编号
   */
  regionProvinceId: number;
  /**
   * 城市编号
   */
  regionCityId: number;
  /**
   * 地区编号
   */
  regionCountyId: number;
  /**
   * 详细地址
   */
  address: string;
  /**
   * 可用积分
   */
  poiAvailableValue: number;
  /**
   * 冻结积分
   */
  poiFreezingValue: number;
  /**
   * 会员等级
   *  1：白银
   *  2：黄金
   *  3：铂金
   *  4：钻石
   */
  memberLevelId: 1 | 2 | 3 | 4;
  /**
   * 经验值
   */
  experiencePoints: number;
  /**
   * 用户状态
   */
  status: 1;
  /**
   * 创建时间（ISO 8601）
   */
  createTime: string;
  /**
   * 更新时间（ISO 8601）
   */
  updateTime: string;
}

/**
 * 微信方式登录
 * @param state
 * @param code
 */
export function loginByWechatOauth(state: string, code: string) {
  return request.post<UserInfo>('/auth/consumer/loginByWechatOauth', {
    accountType: 'wechat_yyj',
    state,
    code,
  });
}

/**
 * 手机注册登录
 * @param openid
 * @param memberPhone
 * @param validateCode
 * @param source
 */
export function loginByPhone({
  openid,
  memberPhone,
  validateCode,
  source,
}: {
  openid?: string;
  memberPhone: string;
  validateCode: string;
  source?: string;
}) {
  return request.post<UserInfo>('/auth/consumer/loginByPhone', {
    accountType: 'wechat_yyj',
    loginSource: source || 'wechat',
    phone: memberPhone,
    openid,
    taskId: 7,
    validateCode,
  });
}

/**
 * 发送短信验证码
 * @param phone
 */
export function sendValidateCode(phone: string) {
  return request.post<void>('/message/sendValidateCode', {
    taskId: 7,
    length: 6,
    phone,
  });
}

/**
 * 微信JSSDK授权
 * @param appId
 * @param url
 */
export function wxAuth(appId: string, url: string) {
  return request.post<{
    appId: string;
    timestamp: string;
    nonceStr: string;
    signature: string;
  }>(
    '/wechatBH/jssdk',
    {
      appId,
      url,
    },
    {
      type: 'form',
    },
  );
}
