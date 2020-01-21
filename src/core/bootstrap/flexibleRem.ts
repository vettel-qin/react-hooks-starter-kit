/*
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import { BASE_FONT_SIZE, BASE_SCREEN_WIDTH } from '~/config';

function resizeFontSize() {
  const docEl = document.documentElement!;
  const screenWidth = docEl.getBoundingClientRect().width || window.innerWidth;
  const fontSize = (screenWidth / BASE_SCREEN_WIDTH) * BASE_FONT_SIZE;
  docEl.style.fontSize = `${fontSize > BASE_FONT_SIZE ? BASE_FONT_SIZE : fontSize}px`;
}

function flexibleRem() {
  resizeFontSize();

  window.addEventListener('resize', resizeFontSize);
  window.addEventListener('orientationchange', resizeFontSize);
}

export default flexibleRem;
