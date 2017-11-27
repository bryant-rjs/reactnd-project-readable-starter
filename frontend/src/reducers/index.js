import { combineReducers } from 'redux'

import {
  FETCH_POSTS,
  INITIAL_POSTS,
  INITIAL_CATEGORIES,
} from '../actions'

function posts (state = [], action) {
  switch(action.type) {
    case INITIAL_POSTS:
      return action.posts
    case FETCH_POSTS:
      return state
    default:
      return state
  }
}

function categories(state = [], action) {

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
