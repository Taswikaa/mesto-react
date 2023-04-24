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
    setSelectedCard(null);
  }

  const handleCardClick = function(card) {
    setSelectedCard(card);
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="page">
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
      <Footer />

      <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input className="popup__input popup__input_pupose_name" type="text" defaultValue="" name="nick" placeholder="Ваше имя" id="nick-input" required minLength="2" maxLength="40" />
          <span className="popup__span-error nick-input-error"></span>
          <input className="popup__input popup__input_pupose_job" type="text" defaultValue="" name="job" placeholder="Ваше хобби" id="job-input" required minLength="2" maxLength="200" />
          <span className="popup__span-error job-input-error"></span>
      </ PopupWithForm>

      <PopupWithForm name="add" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} >
          <input className="popup__input popup__input_pupose_place" type="text" defaultValue="" name="place" placeholder="Название" id="place-input" required minLength="2" maxLength="30" />
          <span className="popup__span-error place-input-error"></span>
          <input className="popup__input popup__input_pupose_url" type="url" defaultValue="" name="url-image" placeholder="Ссылка на картинку" id="url-input" required />
          <span className="popup__span-error url-input-error"></span>
      </ PopupWithForm>

      <PopupWithForm name="change-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input className="popup__input popup__input_pupose_url" type="url" defaultValue="" name="url-avatar" placeholder="Ссылка на аватар" id="url-avatar" required />
          <span className="popup__span-error url-avatar-error"></span>
      </ PopupWithForm>

      <PopupWithForm name="delete" title="Вы уверены?" children={
        <button className="popup__button popup__button_purpose_submit">Да</button>
      } />

      <ImagePopup card={selectedCard} onClose={closeAllPopups}  />
    </div>
  );
}

export default App;
