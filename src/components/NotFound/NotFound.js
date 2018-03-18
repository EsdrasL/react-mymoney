import React from 'react';

import Logo from '../Logo/Logo';
import './NotFound.css';

const NotFound = (props) => (
  <div className="Not-Found">
    <Logo logoType="Logo-Lg" />
    <h1>Oops! :(</h1>
    <h1>404</h1>
    <h2>Sorry. We can't seem to find that page for you.</h2>
  </div>
);

export default NotFound;