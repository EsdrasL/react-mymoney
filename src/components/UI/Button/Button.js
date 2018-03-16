import React from 'react';

import './Button.css';

const Button = (props) => (
  <button type="button" disabled={props.disabled}
    className={"Button " + props.btnType}onClick={props.onClick}>
    {props.children}
  </button>
);

export default Button;