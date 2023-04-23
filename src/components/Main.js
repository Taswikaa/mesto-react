import React, { useEffect, useState } from "react";

import Card from "./Card";
import pencilImage from "../images/pencil.svg"
import api from "../utils/api";

function Main(props) {
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

    api.getInitialCards()
    .then(data => {
      setCards([...cards, data])
    })

    // Promise.all([getUserInfo, getInitialCards])
    // .then(data => {
    //   setUserName(data[0].name);
    //   setUserDescription(data[0].about);
    //   setUserAvatar(data[0].avatar);

    //   setCards([...cards, data[1]])
    // })

    return () => {

    }
  }, [])

  return (
    <main className="main">
      <section className="profile">
        <img className="profile__avatar" src={userAvatar} alt="Аватар" onClick={ props.onEditAvatar } />
        <img className="profile__pencil" src={pencilImage} alt="Иконка редактирования профиля" />
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="button profile__edit-button" type="button" onClick={ props.onEditProfile }></button>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button className="button profile__add-button" type="button" onClick={ props.onAddPlace }></button>
      </section>
      <section className="elements">
        <ul className="elements__wrapper">
          {
            cards.length && cards[0].map((el, i) => 
            // li не внутри Card, так как i не передаётся в виде propsa
            <li className="elements__item" key={i}>
              <Card el={el} onCardClick={props.onCardClick} />
            </li>
            )
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;