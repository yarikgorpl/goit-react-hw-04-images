import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from 'components/Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onToggleModal, children }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onToggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToggleModal]);

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onToggleModal();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
