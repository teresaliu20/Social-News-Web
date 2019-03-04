import { combineReducers } from 'redux';

import repos from './repos';
import user from './user';
import collections from './collections';

export default combineReducers({
  repos,
  user,
  collections,
});
