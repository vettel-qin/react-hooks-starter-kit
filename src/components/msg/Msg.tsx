import React from 'react';
import s from './Msg.scss';

interface IMsgProps {
  style?: object;
}

const Msg: React.SFC<IMsgProps> = ({ children, style }) => {
  return (
    <section className={s.msg} style={style}>
      {children}
    </section>
  );
};

Msg.defaultProps = {
  style: {},
};

export default Msg;
