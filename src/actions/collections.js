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

export const createNewCollectionAction = (name, userId, description, links) => {
  return async (dispatch) => {
    const url = 'http://127.0.0.1:8000/api/collections';
    axios.post(url, {
      name,
      user_id: userId,
      description,
      links,
    })
      .then((res) => {
        dispatch({
          type: Types.POST_COLLECTIONS_SUCCESS,
          collection: res.data.collectionInfo,
        });
      })
      .catch((error) => {
        dispatch({
          type: Types.POST_COLLECTIONS_FAILURE,
          error,
        });
      });
  };
};

export const editCollectionAction = (name, userId, description, links, collectionId) => {
  return async (dispatch) => {
    const url = 'http://127.0.0.1:8000/api/collections/edit';
    axios.post(url, {
      name,
      user_id: userId,
      description,
      links,
      collection_id: collectionId,
    })
      .then((res) => {
        dispatch({
          type: Types.EDIT_COLLECTIONS_SUCCESS,
          collection: res.data.collectionInfo,
        });
      })
      .catch((error) => {
        dispatch({
          type: Types.EDIT_COLLECTIONS_FAILURE,
          error,
        });
      });
  };
};
