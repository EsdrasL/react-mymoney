import React from 'react';

import './ContentHeader.css';

const ContentHeader = (props) => (
  <section className="Content-Header">
    <h3>{props.title}<small>{props.subtitle}</small></h3>
  </section>
);

export default ContentHeader;