import Types from '../actions/index';

const collections = (state = [], action) => {
  switch (action.type) {
    case Types.GET_COLLECTIONS_SUCCESS:
      return action.collections;
    case Types.GET_COLLECTIONS_FAILURE:
      return state;
    case Types.POST_COLLECTIONS_SUCCESS:
      return [...state, action.collection];
    case Types.EDIT_COLLECTIONS_SUCCESS:

      const updatedCollections = [...state];

      const oldCollectionIndex = updatedCollections.findIndex((collection) => {
        return collection.id === action.collection.id;
      });

      updatedCollections.splice(oldCollectionIndex, 1, action.collection);

      console.log(updatedCollections);
      return updatedCollections;

    case Types.EDIT_COLLECTIONS_FAILURE:
      return state;
    case Types.POST_COLLECTIONS_FAILURE:
      return state;
    default:
      return state;
  }
};

export default collections;
