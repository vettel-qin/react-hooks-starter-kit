/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import flexibleRem from './flexibleRem';
import fixIosScroll from './fixIosScroll';

export default function bootstrap() {
  return Promise.all([flexibleRem(), fixIosScroll()]);
}
