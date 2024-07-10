export default function ImagePopup(props) {
  return (
    <div className={`${props.popup} ${props.isImagePopupOpen && "popup-open"}`}>
      <div className={props.container}>
        <div onClick={props.onClose} className={props.close}></div>
        <img
          src={props.imgPath}
          alt={props.title}
          className="image-container__img"
        />
        <p className="image-container__title">{props.title}</p>
      </div>
    </div>
  );
}
