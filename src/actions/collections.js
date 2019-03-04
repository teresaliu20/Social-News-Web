import axios from 'axios';
import Types from './index';


/* eslint-disable import/prefer-default-export */
export const getCollectionsAction = (userId) => {
  return async (dispatch) => {
    const url = `http://127.0.0.1:8000/api/users/${userId}/collections`;
    axios.get(url)
      .then((res) => {
        dispatch({
          type: Types.GET_COLLECTIONS_SUCCESS,
          collections: res.data.collections,
        });
      })
      .catch((error) => {
        dispatch({
          type: Types.GET_COLLECTIONS_FAILURE,
          error,
        });
      });
  };
};
