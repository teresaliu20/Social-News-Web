import { combineReducers } from 'redux';

import repos from './repos';
import user from './user';
import collections from './collections';
import social from './social';

export default combineReducers({
  repos,
  user,
  social,
  collections,
});
