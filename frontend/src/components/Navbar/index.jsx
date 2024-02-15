import { Link, NavLink } from 'react-router-dom';
import { BsHouseDoorFill, BsSearch } from 'react-icons/bs';

import './styles.css';

function Navbar() {
  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form id="search-form">
        <BsSearch />
        <input type="text" placeholder="Pesquisar" />
      </form>
      <menu id="nav-links">
        <li>
          <NavLink to="/">
            <BsHouseDoorFill />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">Entrar</NavLink>
        </li>
        <li>
          <NavLink to="/register">Cadastrar</NavLink>
        </li>
      </menu>
    </nav>
  );
}

export default Navbar;
