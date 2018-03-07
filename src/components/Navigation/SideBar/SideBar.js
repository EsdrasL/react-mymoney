import React from 'react';

import NavItem from '../NavItem/NavItem';
import './SideBar.css';

const SideBar = (props) => (
  <aside className={props.sideBarCollapse ? "SideBar SideBar-Collapsed" : "SideBar"}>
    <ul className="Items">
      <NavItem name="Dashboard" icon="fas fa-columns" />
      <NavItem name="Payments" icon="fas fa-dollar-sign"/>
    </ul>
  </aside>
);

export default SideBar;