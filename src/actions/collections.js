import axios from 'axios';
import Types from './index';
import config from '../config';

const configOptions = config[process.env.NODE_ENV || 'development'];

/* eslint-disable import/prefer-default-export */
export const getCollectionsAction = (userId) => {
  return async (dispatch) => {
    const url = `${configOptions.hostname}/api/users/${userId}/collections`;
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

export const createNewCollectionAction = (payload) => {
  return async (dispatch) => {
    const url = `${configOptions.hostname}/api/collections`;
    axios.post(url, payload)
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

export const editCollectionAction = (payload) => {
  return async (dispatch) => {
    const url = `${configOptions.hostname}/api/collections/edit`;
    axios.post(url, payload)
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


export const deleteCollectionAction = (collectionId) => {
  return async (dispatch) => {
    const url = `${configOptions.hostname}/api/collections`;
    axios.delete(url, {
      data: {
        collection_id: collectionId,
      },
    })
      .then((res) => {
        dispatch({
          type: Types.DELETE_COLLECTIONS_SUCCESS,
          collection: res.data.collectionInfo,
        });
      })
      .catch((error) => {
        dispatch({
          type: Types.DELETE_COLLECTIONS_FAILURE,
          error,
        });
      });
  };
};
