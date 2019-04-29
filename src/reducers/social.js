import Types from '../actions/index';

const initialState = {
  followings: [],
  followers: [],
  error: '',
};

const social = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        followings: action.followings,
      };
    case Types.GET_FOLLOWINGS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default social;
