import axios from 'axios';
import Types from './index';

export const editProfileAction = (profileInfo) => {
  return async (dispatch) => {
    const url = 'http://127.0.0.1:8000/api/users/edit';

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
          error,
        });
      });
  };
};
