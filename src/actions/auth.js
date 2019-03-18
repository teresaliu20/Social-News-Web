import axios from 'axios';
import Types from './index';
import config from '../config';
import errorMessages from './errorMessages';

const configOptions = config[process.env.NODE_ENV || 'development'];

export const loginAction = (username, password) => {
  return async (dispatch) => {
    dispatch({
      type: Types.LOGIN_REQUESTED,
    });
    const url = `${configOptions.hostname}/api/login`;
    return axios.post(url, {
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
        let errorMessage = '';
        if (!error.response) {
          errorMessage = errorMessages.networkError;
        }
        else if (error.response.status === 400) {
          errorMessage = 'Username and password doesn\'t match any users';
        }
        else {
          errorMessage = errorMessages.bugError;
        }
        dispatch({
          type: Types.LOGIN_FAILURE,
          error: errorMessage,
        });
      });
  };
};

export const signupAction = (signupInfo) => {
  return async (dispatch) => {
    dispatch({
      type: Types.SIGNUP_REQUESTED,
    });
    const url = `${configOptions.hostname}/api/signup`;
    axios.post(url, {
      username: signupInfo.username,
      password: signupInfo.password,
      firstname: signupInfo.firstName,
      lastname: signupInfo.lastName,
      email: signupInfo.email,
    })
      .then((res) => {
        console.log(res);
        dispatch({
          type: Types.SIGNUP_SUCCESS,
          user: res.data,
        });
      })
      .catch((error) => {
        let errorMessage = '';
        if (!error.response) {
          errorMessage = errorMessages.networkError;
        }
        else if (error.response.status === 400) {
          errorMessage = 'Signup failed. Try different username.';
        }
        else {
          errorMessage = errorMessages.bugError;
        }
        dispatch({
          type: Types.SIGNUP_FAILURE,
          error: errorMessage,
        });
      });
  };
};

export const logoutAction = (username, password) => {
  return async (dispatch) => {
    const url = `${configOptions.hostname}/api/logout`;
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
          error: error.message,
        });
      });
  };
};
