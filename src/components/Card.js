function Card(props) {

  // console.log(props.el);

  const handleClick = function() {
    props.onCardClick(props.el);
  }

  return (
      <div className="elements__card">
        <button className="button elements__delete-icon"></button>
        <img className="elements__image" src={props.el.link} alt={props.el.name} onClick={handleClick} />
        <div className="elements__info">
          <h2 className="elements__name">{props.el.name}</h2>
          <div className="elements__likes">
            <button className="button elements__favorite" type="button"></button>
            <p className="elements__like-counter">{props.el.likes.length}</p>
          </div>
        </div>
      </div>
  );
}

export default Card;