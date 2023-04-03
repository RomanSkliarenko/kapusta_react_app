import React from 'react';
import styles from './sharedButton.module.scss';
import classNames from 'classnames';
import {SharedButtonProps} from './sharedButtonTypes';

const SharedButton: React.FC<SharedButtonProps> = ({
  disabled,
  type = 'button',
  active,
  children,
  onClick,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick ?? onClick}
      className={classNames(
        styles.button,
        active && styles.buttonActive,
        className
      )}
    >
      {children}
    </button>
  );
};

export default SharedButton;