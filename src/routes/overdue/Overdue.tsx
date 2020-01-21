/*
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import React, { Component } from 'react';
import s from './Overdue.scss';

interface IOverdueProps {}

class Overdue extends Component<IOverdueProps> {
  public static defaultProps = {};

  constructor(props: IOverdueProps) {
    super(props);
  }

  public render() {
    return (
      <>
        <div className="flex-1" />
        <div className={s.pastdue} />
        <div className={s.text}>活动已过期</div>
        <div className="flex-3" />
        <div className={s.logo} />
      </>
    );
  }
}

export default Overdue;
