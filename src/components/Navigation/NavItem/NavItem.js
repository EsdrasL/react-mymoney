import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavItem.css';

const NavItem = (props) => (
  <li className="NavItem">
    <NavLink
      to={props.link}
      exact={props.exact}>
      <i className={props.icon}></i>
      <span>{props.children}</span>
    </NavLink>
  </li>
);

export default NavItem;