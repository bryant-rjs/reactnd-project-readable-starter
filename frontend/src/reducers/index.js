import { combineReducers } from 'redux'

import {
  FETCH_POSTS,
  INITIAL_POSTS,
  INITIAL_CATEGORIES,
  VOTE_UP,
  VOTE_DOWN,
} from '../actions'

function posts (state = {}, action) {
  const { voteScore, postID, index } = action

  switch(action.type) {
    case INITIAL_POSTS:
      var result = action.posts.reduce((obj, item, index) => {
        console.log(index);
        obj[item.id] = item;
        return obj;
      }, {})
      return result;
    case FETCH_POSTS:
      return state
    case VOTE_UP:
      return {
        ...state,
          [postID]: {
            ...state[postID],
            voteScore: state[postID].voteScore + 1
          }
      }
    case VOTE_DOWN:
      return {
        ...state,
          [postID]: {
            ...state[postID],
            voteScore: state[postID].voteScore - 1
          }
      }
    default:
      return state
  }
}

function categories(state = {}, action) {

  switch(action.type) {
    case INITIAL_CATEGORIES:
      return action.categories
    default:
      return state
  }

}

export default combineReducers({
  posts,
  categories,
})
