import React, { Component } from 'react';

import Header from './components/Navigation/Header/Header';
import SideBar from './components/Navigation/SideBar/SideBar';
import './App.css';

class App extends Component {
  state = {
    sideBarCollapse: false
  }

  sideBarToggleHandler = () => {
    this.setState((prevState, props) => {
      return {sideBarCollapse: !prevState.sideBarCollapse}
    });
  }

  render() {
    return (
      <div className="App">
        <Header 
          sideBarToggle={this.sideBarToggleHandler}
          sideBarCollapse={this.state.sideBarCollapse} />
        <SideBar 
          sideBarCollapse={this.state.sideBarCollapse} />
      </div>
    );
  }
}

export default App;
