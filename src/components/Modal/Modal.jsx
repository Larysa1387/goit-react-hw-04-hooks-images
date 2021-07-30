import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ modalClose, largeImage }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      modalClose();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      modalClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={largeImage} alt="" />
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};
