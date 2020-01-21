/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

export function valuePassThrought(fn: () => any, isThrow?: boolean) {
  return (value: any) => {
    try {
      fn();
    } catch {
      // nothing to do
    }

    if (isThrow) {
      throw value;
    } else {
      return value;
    }
  };
}

export function normalizeString(param: string | string[] | null | undefined) {
  return Array.isArray(param) ? param[0] : param || '';
}

export function delay(ms: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
