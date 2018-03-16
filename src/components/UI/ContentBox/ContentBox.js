import React from 'react';

import './ContentBox.css';

const ContentBox = (props) => (
  <div className="Content-Box">
    <div className="Box-Header">{props.title}</div>
    <hr/>
    {props.children}
  </div>
);

export default ContentBox;