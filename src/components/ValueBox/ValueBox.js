import React from 'react';

import './ValueBox.css';

const ValueBox = (props) => (
  <div className={"ValueBox " + props.color}>
    <div className="Value">
      <h3>{props.value}</h3>
      <p>{props.text}</p>
    </div>
    <div className="Icon">
      <i className={props.icon}></i>
    </div>
  </div>
);

export default ValueBox;