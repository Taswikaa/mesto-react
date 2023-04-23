import { useState } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  const handleEditProfileClick = function() {
    setEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = function() {
    setEditAvatarPopupOpen(true);
  }
  
  const handleAddPlaceClick = function() {
    setAddPlacePopupOpen(true);
  }

  const closeAllPopups = function() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard('');
  }

  const handleCardClick = function(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');

  return (
    <div className="page">
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
      <Footer />

      <PopupWithForm name="edit" title="Редактировать профиль" children={
        <>
          <input className="popup__input popup__input_pupose_name" type="text" defaultValue="" name="nick" placeholder="Ваше имя" id="nick-input" required minLength="2" maxLength="40" />
          <span className="popup__span-error nick-input-error"></span>
         <input className="popup__input popup__input_pupose_job" type="text" defaultValue="" name="job" placeholder="Ваше хобби" id="job-input" required minLength="2" maxLength="200" />
         <span className="popup__span-error job-input-error"></span>
         <button className="popup__button popup__button_purpose_submit">Сохранить</button>
        </>
      } isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

      <PopupWithForm name="add" title="Новое место" children={
        <>
          <input className="popup__input popup__input_pupose_place" type="text" defaultValue="" name="place" placeholder="Название" id="place-input" required minLength="2" maxLength="30" />
          <span className="popup__span-error place-input-error"></span>
          <input className="popup__input popup__input_pupose_url" type="url" defaultValue="" name="url-image" placeholder="Ссылка на картинку" id="url-input" required />
          <span className="popup__span-error url-input-error"></span>
          <button className="popup__button popup__button_purpose_submit">Создать</button>
        </>
      } isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

      <PopupWithForm name="change-avatar" title="Обновить аватар" children={
        <>
          <input className="popup__input popup__input_pupose_url" type="url" defaultValue="" name="url-avatar" placeholder="Ссылка на аватар" id="url-avatar" required />
          <span className="popup__span-error url-avatar-error"></span>
          <button className="popup__button popup__button_purpose_submit">Сохранить</button>
        </>
      } isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

      <PopupWithForm name="delete" title="Вы уверены?" children={
        <button className="popup__button popup__button_purpose_submit">Да</button>
      } />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
      {/* <template id="elements-template">
        <li className="elements__item">
          <div className="elements__card">
            <button className="button elements__delete-icon"></button>
            <img className="elements__image" src="#" alt="" />
            <div className="elements__info">
              <h2 className="elements__name"></h2>
              <div className="elements__likes">
                <button className="button elements__favorite" type="button"></button>
                <p className="elements__like-counter"></p>
              </div>
             </div>
          </div>
        </li>
      </template> */}
    </div>
  );
}

export default App;
