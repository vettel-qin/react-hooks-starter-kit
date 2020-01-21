/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Modal, { IPopupProps } from './Popup';

class Wrapper {
  private container?: HTMLDivElement;
  private timer?: number;

  public show = (children: React.ReactNode, props?: IPopupProps, timeout: number = 0) => {
    if (!this.container) {
      this.container = document.createElement('div');
    }

    ReactDOM.render(
      React.createElement(
        Modal,
        {
          onClose: this.hide,
          ...props,
        },
        children,
      ),
      this.container,
    );

    if (timeout > 0) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = window.setTimeout(() => this.hide(), timeout);
    }
  };

  public hide = () => {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  };
}

export default Wrapper;
