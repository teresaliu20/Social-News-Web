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
    default:
      return state;
  }
};

export default user;
