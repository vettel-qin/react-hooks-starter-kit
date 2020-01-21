/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { valuePassThrought } from '~/core/utils';
import Loading from './Loading';

class Wrapper {
  private refCount: number = 0;
  private container?: HTMLDivElement;

  public show = () => {
    this.refCount += 1;

    if (this.refCount === 1) {
      this.create();
    }
  };

  public hide = () => {
    this.refCount -= 1;

    if (this.refCount === 0) {
      this.destroy();
    } else if (this.refCount < 0) {
      console.warn(`Instance refCount: ${this.refCount}`);
      this.refCount = 0;
    }
  };

  public using = <T = any>(fn: () => Promise<T> | T) => {
    return Promise.resolve()
      .then(valuePassThrought(this.show))
      .then(fn)
      .then<T>(valuePassThrought(this.hide), valuePassThrought(this.hide, true));
  };

  public reset() {
    this.refCount = 0;
    this.destroy();
  }

  private create() {
    if (!this.container) {
      this.container = document.createElement('div');
      ReactDOM.render(React.createElement(Loading), this.container);
    }
  }

  private destroy() {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
      this.container = undefined;
    }
  }
}

export default Wrapper;
