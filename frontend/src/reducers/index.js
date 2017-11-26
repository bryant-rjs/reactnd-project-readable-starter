import { combineReducers } from 'redux'

import {
  FETCH_POSTS,
  INITIAL_POSTS,
  INITIAL_CATEGORIES,
} from '../actions'

function posts (state = {}, action) {
  const { posts } = action
  switch(action.type) {
    case INITIAL_POSTS:
      return {
        posts
      }
    case FETCH_POSTS:
        return state;
    default:
      return state;
  }

}

function categories(state = {}, action) {
  const { categories } = action;

  switch(action.type) {
    case INITIAL_CATEGORIES:
      return {
        categories: categories
      }
    default:
      return state;
  }

}

export default combineReducers({
  posts,
  categories,
})
