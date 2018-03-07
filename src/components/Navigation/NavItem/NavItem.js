import React from 'react';

import './NavItem.css';

const NavItem = (props) => (
  <li className="NavItem">
    <a>
      <i className={props.icon}></i>
      <span style={{margin: "0 6px"}}>{props.name}</span>
    </a>
  </li>
);

export default NavItem;