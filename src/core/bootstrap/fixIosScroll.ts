/*
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
let scrollTop: number = 0;
let scrollLeft: number = 0;

function handleFocusin() {
  scrollLeft = document.documentElement!.scrollLeft || document.body.scrollLeft;
  scrollTop = document.documentElement!.scrollTop || document.body.scrollTop;
}

function handleFocusout() {
  setTimeout(() => {
    window.scrollTo(scrollLeft, scrollTop);
  }, 0);
}

export default function fixIosScroll() {
  const { userAgent } = window.navigator;
  if (/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(userAgent)) {
    document.body.addEventListener('focusin', handleFocusin);
    document.body.addEventListener('focusout', handleFocusout);
  }
}
