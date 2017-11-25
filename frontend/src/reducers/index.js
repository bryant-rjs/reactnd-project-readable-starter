import { combineReducers } from 'redux'

import {
  FETCH_POSTS
} from '../actions'

function posts (state = {}, action) {
  switch(action.type) {
    case 'FETCH_POSTS':
      break;
    default:
      return state;
  }
}

export default posts;

// export default combineReducers({
//   posts,
// })
