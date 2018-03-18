import React, { Component } from 'react';

import './Layout.css';
import AuxWrap from '../AuxWrap';
import Header from '../../components/Navigation/Header/Header';
import SideBar from '../../components/Navigation/SideBar/SideBar';

class Layout extends Component {
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
      <AuxWrap>
        <Header
          sideBarToggle={this.sideBarToggleHandler}
          sideBarCollapse={this.state.sideBarCollapse} />
        <div className="Wrapper">
          <SideBar sideBarCollapse={this.state.sideBarCollapse} />
          <main className="Content">
            {this.props.children}
          </main>
        </div>
      </AuxWrap>
    );
  }
}

export default Layout;