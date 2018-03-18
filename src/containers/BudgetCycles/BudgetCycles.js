import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBudgetCycles, deleteBudgetCycle } from '../../store/actions/budgetCycle';
import Spinner from '../../components/UI/Spinner/Spinner';
import AuxWrap from '../../hoc/AuxWrap';
import './BudgetCycles.css';
import ContentHeader from '../../components/UI/ContentHeader/ContentHeader';
import ContentBox from '../../components/UI/ContentBox/ContentBox';
import Button from '../../components/UI/Button/Button';

class BudgetCycles extends Component {

  componentDidMount() {
    this.props.onFetchBudgetCycles(this.props.token, this.props.userId);
  }

  onUpdateHandler = (id) => {
    this.props.history.push('/budget-cycles/' + id);
  }

  onDeleteHandler = (id) => {
    this.props.onDeleteBudgetCycle(id, this.props.token);
  }

  render() {
    let tableContent = <Spinner />;
    if (!this.props.loading) {
      tableContent = (
        <table className="Table List-Table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Month</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.budgetCycles.map(budgetCycle => (
              <tr key={budgetCycle.id}>
                <td>{budgetCycle.name}</td>
                <td>{budgetCycle.month}</td>
                <td>{budgetCycle.year}</td>
                <td style={{ width: '100px' }}>
                  <Button
                    btnType="Alert" type="button"
                    onClick={() => this.onUpdateHandler(budgetCycle.id)}>
                    <i className="fas fa-pencil-alt"></i>
                  </Button>
                  <Button
                    btnType="Danger" type="button"
                    onClick={() => this.onDeleteHandler(budgetCycle.id)}>
                    <i className="far fa-trash-alt"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <AuxWrap>
        <ContentHeader title="Budget Cycles" subtitle="List" />
        <section className="Content-Body">
          <ContentBox title="List">
            <Button
              btnType="Success" type="button"
              onClick={() => this.props.history.push('/budget-cycles/form')}>
              <i className="fas fa-plus"></i>
              <span>New</span>
            </Button>
            {tableContent}
          </ContentBox>
        </section>
      </AuxWrap>
    );
  }
}

const mapStateToProps = state => {
  return {
    budgetCycles: state.budgetCycle.budgetCycles,
    loading: state.budgetCycle.loading,
    error: state.budgetCycle.error,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchBudgetCycles: (token, userId) => dispatch(fetchBudgetCycles(token, userId)),
    onDeleteBudgetCycle: (id, token) => dispatch(deleteBudgetCycle(id, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCycles);