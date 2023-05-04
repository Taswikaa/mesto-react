import React, { useEffect, useState } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

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

  const handleLikeClick = function(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.cancelLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(`Ошибка: ${err}, не удалось изменить состояние лайка`);
      })
    } else {
      api.likeCard(card._id)
      .then((newCard) => {
        setCards(state => state.map(el => {
          return el._id === card._id ? newCard : el;
        }));
      })
      .catch(err => {
        console.log(`Ошибка: ${err}, не удалось изменить состояние лайка`);
      })
    }
  }

  const handleCardDelete = function(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(state => state.filter(el => {
        return el._id !== card._id;
      })
      )
    })
    .catch(err => {
      console.log(`Ошибка: ${err}, не удалось удалить карточку`);
    })
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
    .then(data => {
      setCurrentUser(data);
    })
    .catch(err => {
      console.log(`Ошибка ${err}, данные пользователя не загружены`);
    })

    api.getInitialCards()
    .then(data => {
      setCards(data)
    })
    .catch(err => {
      console.log(`Ошибка ${err}, карточки не загружены`);
    })

    return () => {

    }
  }, [])

  const handleUpdateUser = function(name, description) {
    api.editUserInfo(name, description)
    .then(data => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch(err => {
      console.log(`Ошибка ${err}, не удалось обновить данные пользователя`);
    })
  }

  const handleUpdateAvatar = function(link) {
    api.changeAvatar(link)
    .then(data => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch(err => {
      console.log(`Ошибка ${err}, не удалось добавить карточку`);
    })
  }

  const handleAddPlaceSubmit = function(name, link) {
    api.addNewCard(name, link, [])
    .then(data => {
      setCards([data, ...cards]);
      closeAllPopups();
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser ? currentUser : {
      name: 'Загрузка...',
      about: 'Загрузка...',
      avatar: ''
    }}>
      <div className="page">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleLikeClick} cards={cards} onCardDelete={handleCardDelete} />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <PopupWithForm name="delete" title="Вы уверены?" children={
          <button className="popup__button popup__button_purpose_submit">Да</button>
        } />

        <ImagePopup card={selectedCard} onClose={closeAllPopups}  />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
