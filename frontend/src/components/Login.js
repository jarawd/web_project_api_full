import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Login({ handleLogin }) {
  const {
    menu,
    setMenu,
    setLoggedIn,
    setIsRegisterPopupOpen,
    setStateRegister,
    setToken,
    tokenCheck,
  } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (menu.length === 0 || menu[0].route !== '/signup') {
      setMenu([{ route: '/signup', title: 'Regístrate' }]);
    }
  }, [menu]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    handleLogin(email, password).then((res) => {
      if (res) {
        setLoggedIn(true);
        navigate('/');
        localStorage.setItem('jwt', res.token);
        setToken(res.token);
        tokenCheck(res.token);
      } else {
        setStateRegister(false);
        setIsRegisterPopupOpen(true);
        navigate('/signup');
      }
    });
  }

  return (
    <div className="login">
      <h2 className="login__title">Inicia Sesión</h2>
      <form
        onSubmit={handleSubmit}
        className="login__form"
      >
        <input
          className="login__form-item"
          name="email"
          type="email"
          placeholder="Correo electrónico"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__form-item"
          name="password"
          type="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="login__button"
        >
          Inicia Sesión
        </button>
      </form>
      <Link
        className="login__register"
        to="/signup"
      >
        ¿Aún no eres miembro? Regístrate aquí
      </Link>
    </div>
  );
}
