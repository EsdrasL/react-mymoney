import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';

import {
  fetchBudgetCycles, addBudgetCycle, updateBudgetCycle
} from '../../store/actions/budgetCycle';
import InputField from '../../components/UI/InputField/InputField';
import ItemList from '../../components/UI/ItemList/ItemList';
import Summary from '../../components/Summary/Summary';
import Spinner from '../../components/UI/Spinner/Spinner';
import AuxWrap from '../../hoc/AuxWrap';
import * as validation from '../../shared/formValidation';
import ContentHeader from '../../components/UI/ContentHeader/ContentHeader';
import ContentBox from '../../components/UI/ContentBox/ContentBox';
import Button from '../../components/UI/Button/Button';
import './BudgetCycleForm.css';

class BudgetCycleForm extends Component {
  state = {
    months: ['January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }

  componentDidMount() {
    let initialValues = [{ month: 'January', incomes: [{}], expenses: [{}] }];
    const urlId = this.props.match.params.id;
    if (urlId) {
      initialValues = this.props.budgetCycles.filter(
        (budgetCycle) => budgetCycle.id === urlId);
      if (!initialValues.length) {
        this.props.onFetchBudgetCycles(this.props.token, this.props.userId);
      }
    }
    this.props.initialize(initialValues[0]);
  }

  componentDidUpdate() {
    const urlId = this.props.match.params.id;
    if (urlId && this.props.pristine) {
      const initialValues = this.props.budgetCycles.filter(
        (budgetCycle) => budgetCycle.id === urlId);
      this.props.initialize(initialValues[0]);
    }
  }

  onFormCancelHandler = () => {
    this.props.history.replace('/budget-cycles');
  }

  onFormSubmitHandler = (data) => {
    const budgetCycle = { ...data, userId: this.props.userId }
    this.props.match.params.id ?
      this.props.onUpdateBudgetCycle(budgetCycle, this.props.token) :
      this.props.onAddBudgetCycle(budgetCycle, this.props.token);
    this.props.history.replace('/budget-cycles');
  }

  calcSummary = () => {
    const sum = (acc, val) => acc + val;
    return this.props.incomes && this.props.expenses ?
      {
        incomesSum: this.props.incomes.map(
          (income) => +income.value || 0).reduce(sum),
        expensesSum: this.props.expenses.map(
          (expense) => +expense.value || 0).reduce(sum)
      } : { incomesSum: 0, expensesSum: 0 }
  }

  render() {
    const { incomesSum, expensesSum } = this.calcSummary();
    const operation = this.props.match.params.id ? "Update" : "Create";
    let formContent = <Spinner />;
    if (!this.props.loading) {
      formContent = (
        <form className="Form" autoComplete="off">
          <div className="Row">
            <div className="Column">
              <Field label="Name"
                name="name"
                component={InputField}
                type="text"
                placeholder="Name"
                validate={[validation.required]} />
            </div>
            <div className="Column">
              <label className="Label">Month</label>
              <Field name="month" component="select" className="Input">
                {this.state.months.map((month) =>
                  <option key={month} value={month}>{month}</option>)}
              </Field>
            </div>
            <div className="Column">
              <Field label="Year"
                name="year"
                component={InputField}
                type="text" maxLength="4"
                placeholder="Year"
                validate={[validation.required, validation.number]} />
            </div>
          </div>
          <Summary incomes={incomesSum} expenses={expensesSum} />
          <div className="Row">
            <div className="Column">
              <FieldArray name="incomes" component={ItemList} />
            </div>
            <div className="Column">
              <FieldArray name="expenses" component={ItemList} />
            </div>
          </div>
          <Button disabled={this.props.pristine || this.props.submitting}
            onClick={this.props.handleSubmit((data) => this.onFormSubmitHandler(data))}
            btnType="Success" type="submit">
            Submit
          </Button>
          <Button
            onClick={this.onFormCancelHandler}
            btnType="Default" type="button">
            Cancel
          </Button>
        </form>
      );
    }
    return (
      <AuxWrap>
        <ContentHeader title="Budget Cycles" subtitle={operation} />
        <ContentBox title={operation}>
          {formContent}
        </ContentBox>
      </AuxWrap>
    );
  }
}

const selector = formValueSelector('budgetCycleForm');
const mapStateToProps = state => {
  return {
    budgetCycles: state.budgetCycle.budgetCycles,
    loading: state.budgetCycle.loading,
    error: state.budgetCycle.error,
    token: state.auth.token,
    userId: state.auth.userId,
    incomes: selector(state, 'incomes'),
    expenses: selector(state, 'expenses')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchBudgetCycles: (token, userId) => dispatch(fetchBudgetCycles(token, userId)),
    onAddBudgetCycle: (data, token) => dispatch(addBudgetCycle(data, token)),
    onUpdateBudgetCycle: (data, token) => dispatch(updateBudgetCycle(data, token))
  }
}

export default reduxForm({
  form: 'budgetCycleForm'
})(connect(mapStateToProps, mapDispatchToProps)(BudgetCycleForm));