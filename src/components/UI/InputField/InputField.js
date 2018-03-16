import React from 'react';

import AuxWrap from '../../../hoc/AuxWrap';
import './InputField.css';

const InputField = (props) => {
  const { input, label, meta: { touched, error }, ...attributes } = props;
  const invalid = touched && error;
  return (
    <AuxWrap>
      <label className={invalid ? "Label Invalid" : "Label"}>{label}</label>
      <input className={invalid ? "Input Invalid" : "Input"} {...input} {...attributes} />
    </AuxWrap>
  );
};

export default InputField;