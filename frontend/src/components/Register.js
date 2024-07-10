import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Register({ handleRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setMenu, setIsRegisterPopupOpen, setStateRegister } =
    useContext(CurrentUserContext);

  useEffect(() => {
    setMenu([{ route: '/signin', title: 'Iniciar Sesión' }]);
  }, [setMenu]);

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      handleRegister(email, password)
        .then((res) => {
          if (res) {
            setStateRegister(true);
            setIsRegisterPopupOpen(true);
            navigate('/signin');
          } else {
            setStateRegister(false);
            setIsRegisterPopupOpen(true);
          }
        })
        .catch(() => {
          setStateRegister(false);
          setIsRegisterPopupOpen(true);
        });
    } else {
      setStateRegister(false);
      setIsRegisterPopupOpen(true);
    }
  }
  return (
    <div className="register">
      <h2 className="register__title">Regístrate</h2>
      <form
        onSubmit={handleSubmit}
        className="register__form"
      >
        <input
          className="register__form-item"
          name="email"
          type="email"
          placeholder="Correo electrónico"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register__form-item"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="register__button"
        >
          Regístrate
        </button>
      </form>
      <Link
        className="register__login"
        to="/signin"
      >
        ¿Ya eres miembro? Inicia sesión aquí
      </Link>
    </div>
  );
}
