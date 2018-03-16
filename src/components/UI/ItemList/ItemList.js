import React from 'react';
import { Field } from 'redux-form';

import InputField from '../InputField/InputField';
import * as validation from '../../../shared/formValidation';
import Button from '../Button/Button';
import './ItemList.css';
import AuxWrap from '../../../hoc/AuxWrap';

const ItemList = ({ fields }) => (
  <AuxWrap>
    <div className="Item-Title">
      {fields.name}
    </div>
    <table className="Table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((subField, index) =>
          <tr key={index}>
            <td>
              <Field
                name={`${subField}.name`}
                type="text"
                component={InputField}
                placeholder="Name"
                validate={[validation.required]} />
            </td>
            <td>
              <Field
                name={`${subField}.value`}
                type="text" maxLength="8"
                component={InputField}
                placeholder="Value"
                validate={[validation.required, validation.number]} />
            </td>
            <td style={{ textAlign: 'center' }}>
              <Button onClick={() => fields.remove(index)}
                btnType="Danger" disabled={fields.length <= 1}>
                <i className="far fa-trash-alt"></i>
              </Button>
            </td>
          </tr>
        )}
        <tr>
          <td></td>
          <td></td>
          <td style={{ textAlign: 'center' }}>
            <Button onClick={() => fields.push({})} btnType="Success">
              <i className="fas fa-plus"></i>
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </AuxWrap>
);

export default ItemList;