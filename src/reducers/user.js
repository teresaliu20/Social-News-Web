import Types from '../actions/index';

const initialUserState = {
  data: {},
  pending: false,
  error: null,
};

const user = (state = initialUserState, action) => {
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
      return {
        data: action.user,
        pending: false,
        error: null,
      };
    case Types.LOGIN_REQUESTED:
      return {
        data: {},
        pending: true,
        error: null,
      };
    case Types.LOGIN_FAILURE:
      return {
        data: {},
        pending: false,
        error: action.error,
      };
    case Types.SIGNUP_SUCCESS:
      return {
        data: action.user,
        pending: false,
        error: null,
      };
    case Types.SIGNUP_REQUESTED:
      return {
        data: {},
        pending: true,
        error: null,
      };
    case Types.SIGNUP_FAILURE:
      return {
        data: {},
        pending: false,
        error: action.error,
      };
    case Types.LOGOUT_SUCCESS:
      return {
        data: {},
        pending: false,
      };
    case Types.LOGOUT_FAILURE:
      return {
        data: {},
        pending: false,
      };
    case Types.EDIT_PROFILE_SUCCESS:
      return {
        data: action.user,
        pending: false,
        error: null,
      };
    case Types.EDIT_PROFILE_FAILURE:
      return {
        data: {},
        pending: false,
        error: action.error,
      };
    case 'persist/REHYDRATE':
      if (action.payload && action.payload.user && action.payload.user.data) {
        return action.payload.user;
      }
      return initialUserState;
    default:
      return state;
  }
};

export default user;
