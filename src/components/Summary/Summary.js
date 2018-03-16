import React from 'react';

import './Summary.css';
import ValueBox from '../ValueBox/ValueBox';

const Summary = ({ incomes, expenses }) => (
  <div className="Summary">
    <div className="Item-Title">Summary</div>
    <div className="Summary-Body">
      <ValueBox value={"$ " + incomes.toFixed(2)} text="Total Income" 
        icon="fas fa-briefcase fa-5x" color="Success"/>
      <ValueBox value={"$ " + expenses.toFixed(2)} text="Total Expenses" 
        icon="far fa-credit-card fa-5x" color="Danger"/>
      <ValueBox value={"$ " + (incomes - expenses).toFixed(2)} text="Savings" 
        icon="far fa-money-bill-alt fa-5x" color="Primary"/>
    </div>
  </div>
);

export default Summary;