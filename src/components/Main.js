import React, { useEffect, useState } from "react";

import Card from "./Card";
import pencilImage from "../images/pencil.svg"
import api from "../utils/api";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {

    api.getUserInfo()
    .then(data => {
      setUserName(data.name);
      setUserDescription(data.about);
      setUserAvatar(data.avatar);
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

  return (
    <main className="main">
      <section className="profile">
        <img className="profile__avatar" src={userAvatar} alt="Аватар" onClick={ onEditAvatar } />
        <img className="profile__pencil" src={pencilImage} alt="Иконка редактирования профиля" />
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="button profile__edit-button" type="button" onClick={ onEditProfile }></button>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button className="button profile__add-button" type="button" onClick={ onAddPlace }></button>
      </section>
      <section className="elements">
        <ul className="elements__wrapper">
          {
            cards.length && cards.map(el => 
              <Card el={el} onCardClick={onCardClick} key={el._id} />
            )
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;