import { useState, useEffect } from 'react';

/**
 * 倒计时Hook，返回剩余时间和设置剩余时间的回调方法
 */
function useCountdown(): [number, (timeLeft: number) => void] {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (!timeLeft) return;

    // 启动定时器
    const timeoutId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeLeft]);

  return [timeLeft, setTimeLeft];
}

export default useCountdown;
