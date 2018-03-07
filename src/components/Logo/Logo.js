import React from 'react';

import './Logo.css';

const Logo = (props) => (
  <a className={props.sideBarCollapse ? "Logo Logo-Collapsed" : "Logo"}>
    <i className="far fa-money-bill-alt"></i>
    <span style={{ margin: "0 6px" }}><b>My</b>Money</span>
  </a>
);

export default Logo;