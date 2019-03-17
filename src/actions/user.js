import axios from 'axios';
import Types from './index';
import config from '../config';

const configOptions = config[process.env.NODE_ENV || 'development'];

export const editProfileAction = (profileInfo) => {
  return async (dispatch) => {
    const url = `${configOptions.hostname}/api/users/edit`;

    axios.post(url, {
      user_id: profileInfo.userId,
      username: profileInfo.username,
      email: profileInfo.email,
      first_name: profileInfo.firstName,
      last_name: profileInfo.lastName,
      bio: profileInfo.bio,
      name: profileInfo.name,
    })
      .then((res) => {
        dispatch({
          type: Types.EDIT_PROFILE_SUCCESS,
          user: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: Types.EDIT_PROFILE_FAILURE,
          error: error.message,
        });
      });
  };
};
