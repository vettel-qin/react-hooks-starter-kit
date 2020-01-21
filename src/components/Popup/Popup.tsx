import React from 'react';
import classNames from 'classnames';
import Portal from '~/components/Portal';
import Button from '~/components/Button';
import s from './Popup.scss';

export interface IPopupProps {
  title?: React.ReactNode;
  confirmText?: string;
  concelText?: string;
  theme?: 1 | 2;
  onConfirm?: (e: React.MouseEvent) => void;
  onClose?: (e: React.MouseEvent) => void;
  onCancel?: (e: React.MouseEvent) => void;
}

const Popup: React.SFC<IPopupProps> = ({
  title,
  children,
  confirmText,
  theme,
  onConfirm,
  onClose,
  concelText,
  onCancel,
}) => {
  const themeClass = theme ? s[`theme-${theme}`] : s['theme-1'];

  return (
    <Portal>
      <section className={classNames(s.modal, themeClass)}>
        <div className={s.main}>
          {title && <div className={s.title}>{title}</div>}
          <div className={s.content}>{children}</div>
          <i className={s.close} onClick={onClose} />
        </div>
        <div className={classNames(s.bottom, themeClass)}>
          {confirmText && (
            <div className={s.footer}>
              <Button onClick={onConfirm}>{confirmText}</Button>
              {concelText && <Button onClick={onCancel}>{concelText}</Button>}
            </div>
          )}
        </div>
      </section>
    </Portal>
  );
};

Popup.defaultProps = {
  confirmText: '',
  theme: 1,
};

export default Popup;
