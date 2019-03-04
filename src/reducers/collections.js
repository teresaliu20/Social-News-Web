import Types from '../actions/index';

const collections = (state = [], action) => {
  switch (action.type) {
    case Types.GET_COLLECTIONS_SUCCESS:
      return action.collections;
    case Types.GET_COLLECTIONS_FAILURE:
      return state;
    case Types.POST_COLLECTIONS_SUCCESS:
      return [...state, action.collection];
    case Types.POST_COLLECTIONS_FAILURE:
      return state;
    default:
      return state;
  }
};

export default collections;
