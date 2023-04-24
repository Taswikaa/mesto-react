function Card({ el, onCardClick }) {

  const handleClick = function() {
    onCardClick(el);
  }

  return (
    <li className="elements__item">
      <div className="elements__card">
        <button className="button elements__delete-icon"></button>
        <img className="elements__image" src={el.link} alt={el.name} onClick={handleClick} />
        <div className="elements__info">
          <h2 className="elements__name">{el.name}</h2>
          <div className="elements__likes">
            <button className="button elements__favorite" type="button"></button>
            <p className="elements__like-counter">{el.likes.length}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;