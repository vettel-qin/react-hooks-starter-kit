import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number) {
  const tickCallback = useRef<() => void>();

  useEffect(() => {
    tickCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (tickCallback.current) {
        tickCallback.current();
      }
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
