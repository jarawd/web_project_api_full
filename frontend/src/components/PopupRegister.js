import React from 'react';
import PopupWithForm from './PopupWithForm';
import successRegisterImg from '../images/successRegister.svg';
import failRegisterImg from '../images/failRegister.svg';

export default function PopupRegister(props) {
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      popup="popup-register"
      popupContainer="popup-register__container"
      close="popup-register__close"
      title="popup-register__title"
      text=""
      onClose={props.onClose}
    >
      <img
        src={props.status ? successRegisterImg : failRegisterImg}
        alt="register-status"
      />
      <p className="popup-register__caption">
        {props.status
          ? '¡Correcto! Ya estás registrado.'
          : 'Uy, algo salió mal. Por favor, inténtalo de nuevo.'}
      </p>
    </PopupWithForm>
  );
}
