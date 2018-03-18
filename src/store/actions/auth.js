import axios from 'axios';
import * as actions from './actionTypes';

export const auth = (email, password, isLogin) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA7EKvF0ClF7gJd9_9DJ9P6l5mFRgrizZs';
    if (!isLogin) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA7EKvF0ClF7gJd9_9DJ9P6l5mFRgrizZs';
    }
    axios.post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  }
}

export const authStart = () => {
  return {
    type: actions.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    token: token,
    userId: userId
  }
}

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  }
}

export const authCheckState = () => {
  return dispatch => {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate > new Date()) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
    } else {
      dispatch(logout());
    }
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actions.AUTH_LOGOUT
  }
}