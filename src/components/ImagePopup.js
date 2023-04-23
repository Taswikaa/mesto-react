function ImagePopup(props) {
  return (
    <div className={`popup popup_image ${props.isOpen && 'popup_opened'}`}>
      <figure className="popup__figure">
        <button className="button popup__button popup__button_purpose_close" onClick={props.onClose}></button>
        {/* link через шаблонную строку, так как девтулзы жалуются на неправильный тип */}
        <img className="popup__img" src={`${props.card.link}`} alt={props.card.name} />
        <figcaption className="popup__text">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;