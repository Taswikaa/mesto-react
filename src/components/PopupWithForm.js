function PopupWithForm(props) {


  return (
    <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button className="button popup__button popup__button_purpose_close" type="button" onClick={ props.onClose }></button>
          <p className="popup__heading">{props.title}</p>
          <form className="popup__form" action="#" name={`${props.name}`} noValidate>
            {props.children}
          </form>
        </div>
      </div>
  );
}

export default PopupWithForm;