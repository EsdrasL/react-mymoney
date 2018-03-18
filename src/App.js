import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Dashboard from './containers/Dashboard/Dashboard';
import BudgetCycles from './containers/BudgetCycles/BudgetCycles';
import BudgetCycleForm from './containers/BudgetCycleForm/BudgetCycleForm';
import NotFound from './components/NotFound/NotFound';
import Layout from './hoc/Layout/Layout';
import { authCheckState } from './store/actions/auth';

class App extends Component {
  componentWillMount() {
    this.props.tryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/" component={NotFound} />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Layout>
          <Switch>
            <Redirect from="/" to="/dashboard" exact />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/budget-cycles" exact component={BudgetCycles} />
            <Route path={"/budget-cycles/form"} component={BudgetCycleForm} />
            <Route path={"/budget-cycles/:id"} component={BudgetCycleForm} />
            <Route path='/logout' component={Logout} />
            <Route path="/" component={NotFound} />
          </Switch>
        </Layout>
      );
    }
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignIn: () => dispatch(authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
