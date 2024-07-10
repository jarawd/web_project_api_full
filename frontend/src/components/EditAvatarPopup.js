import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

export default function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <>
      <PopupWithForm
        isOpen={props.isOpen}
        popup="popup-profile"
        popupContainer="popup-profile__container"
        close="popup-profile__close"
        title="popup-profile__title"
        text="Change profile image"
        onClose={props.onClose}
      >
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="popup-profile__form"
          noValidate
        >
          <input
            ref={avatarRef}
            name="info"
            id="popup-profile__input-info"
            type="url"
            className="popup-profile__form-item"
            required
          />
          <span className="popup-profile__span-error popup-profile__input-info-error"></span>
          <button type="submit" className="popup-profile__button">
            Save
          </button>
        </form>
      </PopupWithForm>
    </>
  );
}
