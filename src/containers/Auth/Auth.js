import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import './Auth.css';
import InputField from '../../components/UI/InputField/InputField';
import Button from '../../components/UI/Button/Button';
import * as validation from '../../shared/formValidation';
import Logo from '../../components/Logo/Logo';
import Spinner from '../../components/UI/Spinner/Spinner';
import { auth } from '../../store/actions/auth';
import AuxWrap from '../../hoc/AuxWrap';

class Auth extends Component {
  state = {
    isLogin: true
  }

  authModeHandler = () => {
    this.setState((prevState) => {
      return { isLogin: !prevState.isLogin }
    });
  }

  onAuthHandler = (data) => {
    this.props.onAuth(data.email, data.password, this.state.isLogin);
  }

  render() {
    const authMode = this.state.isLogin ? "Sign In" : "Sign Up";

    let errorMsg = null;
    if(this.props.error) {
      let errString = this.props.error.message.replace(/_/g, ' ');
      errString = errString.charAt(0).toUpperCase() + errString.slice(1).toLowerCase();
      errorMsg = <p style={{color: '#dd4b39'}}>{errString}</p>
    }

    let loginForm = <Spinner />
    if (!this.props.loading) {
      loginForm = (
        <AuxWrap>
          <form onSubmit={this.props.handleSubmit((data) => this.onAuthHandler(data))}>
            <div className="Row">
              <div className="Column">
                <Field name="email" label="Email" type="email"
                  placeholder="Your email"
                  component={InputField}
                  validate={[validation.required, validation.email]} />
              </div>
            </div>
            <div className="Row">
              <div className="Column">
                <Field name="password" label="Password" type="password"
                  placeholder="Your password"
                  component={InputField}
                  validate={[validation.required, validation.minLength6]} />
              </div>
            </div>
            <Button
              type="submit" btnType="Success"
              disabled={this.props.pristine || this.props.submitting} >
              {authMode}
            </Button>
          </form>
          <hr />
          {
            this.state.isLogin ?
              <p>Don't have an account?</p> :
              <p>Already have an account?</p>
          }
          <Button type="button" btnType="Primary" onClick={this.authModeHandler}>
            {this.state.isLogin ? "Switch to Sign Up" : "Switch to Sign In"}
          </Button>
        </AuxWrap>
      );
    }

    return (
      <div className="Auth">
        <div className="Auth-Card">
          <Logo logoType="Logo-Lg" />
          <h3>{authMode}</h3>
          {errorMsg}
          {loginForm}
        </div>
        <div className="Auth-Img"></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default reduxForm({
  form: 'authForm'
})(connect(mapStateToProps, mapDispatchToProps)(Auth));