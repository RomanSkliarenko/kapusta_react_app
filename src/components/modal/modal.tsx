import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import SharedButton from '../../common/sharedButton/sharedButton';
import style from './modal.module.scss';
import {ModalProps} from './modalTypes';

const Modal: React.FC<ModalProps> = ({closeModalHandler, logoutConfirmHandler}) => {
  const [modalRoot] = useState(() => document.getElementById('modal-root'));

  return ReactDOM.createPortal(
    <div className={style.backdrop}>
      <div className={style.modal}>
        <button onClick={closeModalHandler} className={style.modalCloseButton}/>
        <span className={style.modalText}>Are you sure?</span>
        <div className={style.modalButtonWrapper}>
          <SharedButton onClick={logoutConfirmHandler} active={true}>YES</SharedButton>
          <SharedButton type='button' onClick={closeModalHandler}>NO</SharedButton>
        </div>
      </div>
    </div>,
        modalRoot as HTMLElement
  );
};

export default Modal;
