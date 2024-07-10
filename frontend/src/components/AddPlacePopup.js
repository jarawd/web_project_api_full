import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

export default function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState('');
  const [placePath, setPlacePath] = useState('');

  function setCard(e) {
    e.preventDefault();
    props.onAddPlace({
      name: placeName,
      link: placePath,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      popup="popup"
      popupContainer="popup__container"
      close="popup__close"
      title="popup__title"
      text="New Place"
      onClose={props.onClose}
    >
      <form
        onSubmit={(e) => {
          setCard(e);
        }}
        className="popup__form"
        noValidate
      >
        <input
          onChange={(e) => {
            setPlaceName(e.target.value);
          }}
          name="name"
          type="text"
          id="popup__input-name place"
          placeholder="Título"
          className="popup__form-item popup__form-item_name"
          required
        />
        <span className="popup__span-error popup__input-name-error"></span>
        <input
          onChange={(e) => {
            setPlacePath(e.target.value);
          }}
          type="url"
          name="info"
          id="popup__input-info place"
          placeholder="Enlace de la imagen"
          className="popup__form-item popup__form-item_info"
          required
        />
        <span className="popup__span-error popup__input-info-error"></span>
        <button
          type="submit"
          className="popup__form-button"
        >
          Create
        </button>
      </form>
    </PopupWithForm>
  );
}
