import axios from 'axios';
import Types from './index';
import config from '../config';

const configOptions = config[process.env.NODE_ENV || 'development'];

export const getFollowingsAction = (userId) => {
  return async (dispatch) => {
    const url = `${configOptions.hostname}/api/users/${userId}/following`;

    axios.get(url)
      .then((res) => {
        dispatch({
          type: Types.GET_FOLLOWINGS_SUCCESS,
          followings: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: Types.GET_FOLLOWINGS_FAILURE,
          error: error.message,
        });
      });
  };
};

export const addFollowingAction = (followerId, followingId) => {
  return async (dispatch) => {
    const url = `${configOptions.hostname}/api/users/${followingId}/following`;

    axios.post(url, {
      user_id: followerId,
    })
      .then((res) => {
        dispatch({
          type: Types.GET_FOLLOWINGS_SUCCESS,
          followings: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: Types.GET_FOLLOWINGS_FAILURE,
          error: error.message,
        });
      });
  };
};
