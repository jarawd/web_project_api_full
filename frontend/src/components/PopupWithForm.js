export default function PopupWithForm(props) {
  return (
    <div className={`${props.popup} ${props.isOpen && "popup__opened"}`}>
      <div className={props.popupContainer}>
        <div onClick={props.onClose} className={props.close}></div>
        <h2 className={props.title}>{props.text}</h2>
        {props.children}
      </div>
    </div>
  );
}
