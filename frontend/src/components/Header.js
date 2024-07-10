import logo from '../images/logo.svg';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Header() {
  const { menu } = useContext(CurrentUserContext);
  return (
    <header className="header">
      <img
        src={logo}
        className="header__logo-container"
      />
      <div className="header__menu-container">
        {menu.map((el, i) => {
          return (
            <Link
              key={i}
              className="header__menu-item"
              to={el.route}
            >
              {el.title}
            </Link>
          );
        })}
      </div>
    </header>
  );
}

export default Header;
