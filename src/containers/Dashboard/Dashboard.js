import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Dashboard.css';
import AuxWrap from '../../hoc/AuxWrap';
import { fetchBudgetCycles } from '../../store/actions/budgetCycle';
import ContentHeader from '../../components/UI/ContentHeader/ContentHeader';
import ContentBox from '../../components/UI/ContentBox/ContentBox';
import Spinner from '../../components/UI/Spinner/Spinner';
import ValueBox from '../../components/ValueBox/ValueBox';

class Dashboard extends Component {
  componentDidMount() {
    this.props.onFetchBudgetCycles();
  }

  calcTotal = () => {
    if (this.props.budgetCycles.length) {
      const sum = (acc, val) => acc + val;
      const incomesSum = [], expensesSum = [];
      this.props.budgetCycles.forEach(budgetCycle => {
        incomesSum.push(budgetCycle.incomes.map(income => +income.value).reduce(sum));
        expensesSum.push(budgetCycle.expenses.map(expense => +expense.value).reduce(sum))
      });
      return {
        totalIncome: incomesSum.reduce(sum),
        totalExpenses: expensesSum.reduce(sum)
      }
    }
    return { totalIncome: 0, totalExpenses: 0 }
  }

  render() {
    const { totalIncome, totalExpenses } = this.calcTotal();
    let summaryBox = <Spinner />;
    if (!this.props.loading) {
      summaryBox = (
        <div className="Summary-Box">
          <ValueBox value={"$ " + totalIncome.toFixed(2)}
            text="Your Total Income" icon="fas fa-briefcase fa-5x" color="Success" />
          <ValueBox value={"$ " + totalExpenses.toFixed(2)}
            text="Your Total Expenses" icon="far fa-credit-card fa-5x" color="Danger" />
          <ValueBox value={"$ " + (totalIncome - totalExpenses).toFixed(2)}
            text="Your Savings" icon="far fa-money-bill-alt fa-5x" color="Primary" />
        </div>
      );
    }

    return (
      <AuxWrap>
        <ContentHeader title="Dashboard" subtitle="version 1.0" />
        <ContentBox title="Your Budget through all Cycles">
          {summaryBox}
        </ContentBox>
      </AuxWrap>
    );
  }
}

const mapStateToProps = state => {
  return {
    budgetCycles: state.budgetCycle.budgetCycles,
    loading: state.budgetCycle.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchBudgetCycles: () => dispatch(fetchBudgetCycles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);