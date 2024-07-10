import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

export default function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      popup="popup"
      popupContainer="popup__container"
      close="popup__close"
      title="popup__title"
      text="Edit profile"
      onClose={props.onClose}
    >
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="popup__form"
        noValidate
      >
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          name="name"
          type="text"
          id="popup__input-name profile"
          placeholder="Name"
          className="popup__form-item popup__form-item_name"
          required
        />
        <span className="popup__span-error popup__input-name-error"></span>
        <input
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          type="text"
          name="info"
          id="popup__input-info profile"
          placeholder="Hobby"
          className="popup__form-item popup__form-item_info"
          required
        />
        <span className="popup__span-error popup__input-info-error"></span>
        <button
          type="submit"
          className="popup__form-button"
        >
          Save
        </button>
      </form>
    </PopupWithForm>
  );
}
