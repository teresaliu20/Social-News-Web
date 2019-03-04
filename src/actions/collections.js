import axios from 'axios';
import Types from './index';

/* eslint-disable import/prefer-default-export */
export const getCollectionsAction = (userid) => {
  return async (dispatch) => {
    console.log('getting collections');
    const url = `http://127.0.0.1:8000/api/users/${userid}/collections`;
    axios.get(url)
      .then((res) => {
        console.log(res.data.collections);
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
