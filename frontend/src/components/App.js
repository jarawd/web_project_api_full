import Footer from "./Footer";
import Header from "./Header";
import Register from "./Register";
import PopupRegister from "./PopupRegister";
import Main from "./Main";
import Login from "./Login";
import React, { useState, useEffect } from "react";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);
  const [menu, setMenu] = useState([""]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [stateRegister, setStateRegister] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate("");

  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setImagePopupOpen(false);
    setIsRegisterPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleUpdateUser(user) {
    api
      .setUser(user)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(url) {
    api
      .getAvatar(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res}`);
      })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(obj) {
    api
      .getCard(obj)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res}`);
      })
      .then((data) => {
        setCards({ obj, ...cards });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function tokenCheck(token) {
    auth.getUser(token).then((res) => {
      if (res) {
        setLoggedIn(true);
        navigate("/");
        setUserEmail(res.email);
        api.setToken(token);
        setCurrentUser(res);
        getCards();      
      }
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      tokenCheck(token);
    }
  }, []);

  const getCards = () => {
    api
      .getInitialCards()
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      });
  };

  const contextValues = {
    currentUser,
    menu,
    setMenu,
    loggedIn,
    setLoggedIn,
    setIsRegisterPopupOpen,
    setStateRegister,
    userEmail,
    setUserEmail,
    setToken,
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={contextValues}>
        <div className="general-container">
          <div className="page">
            <Header page="page" />
            <Routes>
              {loggedIn ? (
                <Route
                  path="/*"
                  element={
                    <Main
                      onEditProfileClick={handleEditProfileClick}
                      onAddPlaceClick={handleAddPlaceClick}
                      onEditAvatarClick={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      selectedCard={selectedCard}
                      onClose={closeAllPopups}
                      cards={cards}
                      onCardDelete={handleCardDelete}
                    />
                  }
                />
              ) : (
                <Route
                  path="/*"
                  element={<Login handleLogin={auth.authorize} tokenCheck={tokenCheck}  />}
                ></Route>
              )}
              <Route
                path="/signup"
                element={<Register handleRegister={auth.register} />}
              ></Route>
              <Route
                path="/signin"
                element={<Login handleLogin={auth.authorize} />}
              ></Route>
            </Routes>
            <PopupRegister
              isOpen={isRegisterPopupOpen}
              onClose={closeAllPopups}
              status={stateRegister}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            ></EditProfilePopup>

            <ImagePopup
              popup="image-popup"
              container="image-container"
              close="image-container__close"
              title={selectedCard.name}
              onClose={closeAllPopups}
              imgPath={selectedCard.link}
              isImagePopupOpen={isImagePopupOpen}
            />
            <Footer />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
