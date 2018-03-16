import React from 'react';

import NavItem from '../NavItem/NavItem';
import './SideBar.css';

const SideBar = (props) => (
  <aside className={props.sideBarCollapse ? "SideBar SideBar-Collapsed" : "SideBar"}>
    <ul className="Items">
      <NavItem link="/dashboard" icon="fas fa-columns fa-fw">Dashboard</NavItem>
      <NavItem link="/budget-cycles" icon="fas fa-dollar-sign fa-fw">Budget Cycles</NavItem>
    </ul>
  </aside>
);

export default SideBar;