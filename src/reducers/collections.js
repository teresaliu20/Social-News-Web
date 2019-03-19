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

      const updatedCollectionsEdit = [...state];

      const oldCollectionIndexEdit = updatedCollectionsEdit.findIndex((collection) => {
        return collection.id === action.collection.id;
      });

      updatedCollectionsEdit.splice(oldCollectionIndexEdit, 1, action.collection);
      return updatedCollectionsEdit;

    case Types.EDIT_COLLECTIONS_FAILURE:
      return state;
    case Types.DELETE_COLLECTIONS_SUCCESS:

      const updatedCollectionsDelete = [...state];

      const oldCollectionIndexDelete = updatedCollectionsDelete.findIndex((collection) => {
        return collection.id === action.collection.id;
      });

      updatedCollectionsDelete.splice(oldCollectionIndexDelete, 1);
      return updatedCollectionsDelete;

    case Types.DELETE_COLLECTIONS_FAILURE:
      return state;
    case Types.POST_COLLECTIONS_FAILURE:
      return state;
    default:
      return state;
  }
};

export default collections;
