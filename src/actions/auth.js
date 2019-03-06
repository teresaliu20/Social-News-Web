import axios from 'axios';
import Types from './index';

export const loginAction = (username, password) => {
  return async (dispatch) => {
    const url = 'http://127.0.0.1:8000/api/login';
    axios.post(url, {
      username,
      password,
    })
      .then((res) => {
        dispatch({
          type: Types.LOGIN_SUCCESS,
          user: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: Types.LOGIN_FAILURE,
          error,
        });
      });
  };
};

export const signupAction = (signupInfo) => {
  return async (dispatch) => {
    const url = 'http://127.0.0.1:8000/api/signup';

    axios.post(url, {
      username: signupInfo.username,
      password: signupInfo.password,
      firstname: signupInfo.firstName,
      lastname: signupInfo.lastName,
      email: signupInfo.email,
    })
      .then((res) => {
        dispatch({
          type: Types.SIGNUP_SUCCESS,
          user: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: Types.SIGNUP_FAILURE,
          error,
        });
      });
  };
};

export const logoutAction = (username, password) => {
  return async (dispatch) => {
    const url = 'http://127.0.0.1:8000/api/logout';
    axios.post(url, {
      username,
      password,
    })
      .then((res) => {
        dispatch({
          type: Types.LOGOUT_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: Types.LOGOUT_FAILURE,
          error,
        });
      });
  };
};
