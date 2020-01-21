import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import s from './Home.scss';

window.onpageshow = (e: { persisted: any }) => {
  if (e.persisted) {
    window.location.reload(true);
  }
};

interface IHomeProps {}
interface IHomeState {}

class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <section className={s.root}>
        <Button type="primary">提交</Button>
      </section>
    );
  }
}

export default Home;
