import React from 'react';

import Logo from '../../Logo/Logo';
import NavItem from '../NavItem/NavItem';
import './Header.css';

const Header = (props) => (
  <header className="Header">
    <Logo logoType="Logo-Sm" sideBarCollapse={props.sideBarCollapse} />

    <nav className="Header-Nav">
      <a className="Toggle" onClick={props.sideBarToggle}>
        <i className="fas fa-bars"></i>
      </a>
      <ul className="Items">
        <NavItem link="/logout" exact>Sign Out</NavItem>
      </ul>
    </nav>
  </header>
);

export default Header;