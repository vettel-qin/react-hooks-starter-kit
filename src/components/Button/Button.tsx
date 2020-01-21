import React from 'react';
import cx from 'classnames';
import s from './Button.scss';

interface IButtonProps {
  className?: string;
}

type HtmlButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button: React.SFC<IButtonProps & HtmlButtonProps> = ({ className, ...props }) => {
  return <button className={cx(className, s.button)} {...props} />;
};

Button.defaultProps = {};

export default Button;
