import React from 'react';

import './Logo.css';

const Logo = (props) => {
  const classes = ["Logo"];
  if (props.logoType)
    classes.push(props.logoType);
  if (props.sideBarCollapse)
    classes.push("Logo-Collapsed");

  return (
    <a className={classes.join(" ")}>
      <i className="far fa-money-bill-alt"></i>
      <span><b>My</b>Money</span>
    </a>
  );
};

export default Logo;