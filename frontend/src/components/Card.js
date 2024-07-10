import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';

export default function Card(props) {
  const user = useContext(CurrentUserContext);
  const [likesQty, setLikesQty] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const itsMine =
    user !== null && props.card.owner._id === user.currentUser._id;

  function handleCardLike(card) {
    if (!isLiked) {
      api
        .getLikes(card)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .then((data) => {
          setLikesQty(data.likes.length);
          setIsLiked(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .getDislikes(card)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .then((data) => {
          setLikesQty(data.likes.length);
          setIsLiked(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="elements__card">
      <img
        onClick={() => {
          props.onCardClick(props.card);
        }}
        className="elements__img"
        src={props.link}
        alt={props.name}
      />
      <div
        onClick={() => {
          props.onCardDelete(props.card);
        }}
        className={`elements__trash ${itsMine && 'elements__trash-visible'}`}
      ></div>
      <div className="elements__info">
        <h2 className="elements__title">{props.name}</h2>
        <div className="elements__container-likes">
          <div
            onClick={() => {
              handleCardLike(props.card);
            }}
            className={`elements__like ${isLiked ? 'elements__like-fill' : ''}`}
          ></div>
          <div className="elements__likes-counter">{likesQty}</div>
        </div>
      </div>
    </div>
  );
}
