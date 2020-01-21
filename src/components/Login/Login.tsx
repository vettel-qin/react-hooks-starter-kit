import React, { useState, useRef, useCallback } from 'react';
import { Popup } from '~/components/Popup';
import Loading from '~/components/Loading';
import useCountdown from '~/core/hooks/useCountdown';
import { sendValidateCode, loginByPhone, UserInfo } from '~/api/scrm';
import s from './Login.scss';

interface ILoginProps {
  title?: React.ReactNode;
  params?: any;

  onLogin?: (user: UserInfo) => void;
  onCancel?: () => void;
}

// TODO: Add login loading
const Login: React.SFC<ILoginProps> = ({ title, params, onLogin, onCancel }) => {
  const refPhone = useRef<HTMLInputElement>(null);
  const refCaptcha = useRef<HTMLInputElement>(null);
  const [timeLeft, setTimeLeft] = useCountdown();
  const [errorMsg, setErrorMsg] = useState<string>();
  const onGetCaptcha = useCallback(() => {
    const phone = refPhone.current?.value;
    if (!phone || !/1\d{10}/.test(phone)) {
      setErrorMsg('请输入您的手机号！');
      refPhone.current?.focus();
      return;
    }
    setTimeLeft(60);
    sendValidateCode(phone);
  }, [refPhone, setTimeLeft]);
  const onSubmit = useCallback(async () => {
    const phone = refPhone.current?.value;
    const captcha = refCaptcha.current?.value;

    if (!phone || !/1\d{10}/.test(phone)) {
      setErrorMsg('请输入您的手机号！');
      refPhone.current?.focus();
      return;
    }

    if (!captcha) {
      setErrorMsg('请输入验证码！');
      refCaptcha.current?.focus();
      return;
    }

    try {
      Loading.show();
      const user = await loginByPhone({
        memberPhone: phone,
        validateCode: captcha,
        openid: params?.openid,
        source: params?.source,
      });

      if (onLogin) {
        onLogin(user);
      }
    } catch (error) {
      setErrorMsg(error?.message || '登录失败，请重试！');
    } finally {
      Loading.hide();
    }
  }, [refPhone, refCaptcha, onLogin]);
  const resetErrorMsg = useCallback(() => {
    setErrorMsg(undefined);
  }, [setErrorMsg]);

  return (
    <Popup theme={2} title={title} confirmText="确定" onConfirm={onSubmit} onClose={onCancel}>
      <div className={s.login}>
        <div className={s.inputGroup}>
          <input
            ref={refPhone}
            type="tel"
            className={s.input}
            placeholder="输入手机号"
            maxLength={11}
            onInput={resetErrorMsg}
          />
        </div>
        <div className={s.inputGroup}>
          <input
            ref={refCaptcha}
            type="tel"
            className={s.input}
            placeholder="输入验证码"
            maxLength={6}
            onInput={resetErrorMsg}
          />
          <button className={s.captcha} onClick={onGetCaptcha} disabled={timeLeft > 0}>
            {timeLeft > 0 ? `${timeLeft}s` : '获取验证码'}
          </button>
        </div>
        <p className={s.errorMsg}>{errorMsg}</p>
      </div>
    </Popup>
  );
};

Login.defaultProps = {
  title: '登录',
};

export default Login;
