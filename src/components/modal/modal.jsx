import React from 'react';
import closeIcon from 'assets/images/close.svg';
import './modal.scss';

export function Modal({ isShown, onClose, children }) {
  return isShown ? (
    <div className="modal">
      <div onClick={onClose} className="modal__overlay"></div>
      <div className="modal__content">
        <img onClick={onClose} className="modal__close-icon" src={closeIcon} alt="close" />
        {children}
      </div>
    </div>
  ) : null;
}
