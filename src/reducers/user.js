import Types from '../actions/index';

const user = (state = null, action) => {
  switch (action.type) {
    case Types.LOGIN_SUCCESS:
      return action.user;
    case Types.LOGIN_FAILURE:
      return null;
    case Types.SIGNUP_SUCCESS:
      return action.user;
    case Types.SIGNUP_FAILURE:
      return null;
    case 'persist/REHYDRATE':
      if (action.payload.user) {
        return action.payload.user;
      }
      return state;
    default:
      return state;
  }
};

export default user;
