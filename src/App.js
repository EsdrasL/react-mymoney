import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import './App.css';
import Header from './components/Navigation/Header/Header';
import SideBar from './components/Navigation/SideBar/SideBar';
import Dashboard from './containers/Dashboard/Dashboard';
import BudgetCycles from './containers/BudgetCycles/BudgetCycles';
import BudgetCycleForm from './containers/BudgetCycleForm/BudgetCycleForm';

class App extends Component {
  state = {
    sideBarCollapse: window.innerWidth < 768,
    width: window.innerWidth
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  resizeHandler = () => {
    this.setState((prevState) => {
      if (!prevState.sideBarCollapse && prevState.width >= 768 && window.innerWidth < 768)
        return { sideBarCollapse: true, width: window.innerWidth };
      if (prevState.sideBarCollapse && prevState.width < 768 && window.innerWidth >= 768)
        return { sideBarCollapse: false, width: window.innerWidth };
      return { width: window.innerWidth };
    });
  }

  sideBarToggleHandler = () => {
    this.setState((prevState) => {
      return { sideBarCollapse: !prevState.sideBarCollapse }
    });
  }

  render() {
    return (
      <div className="App">
        <Header
          sideBarToggle={this.sideBarToggleHandler}
          sideBarCollapse={this.state.sideBarCollapse} />
        <div className="Wrapper">
          <SideBar
            sideBarCollapse={this.state.sideBarCollapse} />
          <main className="Content">
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/budget-cycles" exact component={BudgetCycles} />
              <Route path={"/budget-cycles/form"} component={BudgetCycleForm} />
              <Route path={"/budget-cycles/:id"} component={BudgetCycleForm} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
