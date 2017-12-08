import { combineReducers } from 'redux'

import {
  FETCH_POSTS,
  INITIAL_POSTS,
  GET_POST,
  INITIAL_CATEGORIES,
  VOTE_UP,
  VOTE_DOWN,
  COMMENT_VOTEUP,
  COMMENT_VOTEDOWN,
  GET_COMMENTS,
  COMMENT_NEW,
  COMMENT_DELETE,
} from '../actions'

function posts (state = {}, action) {
  const { voteScore, postID, index } = action

  switch(action.type) {
    case INITIAL_POSTS:
      var result = action.posts.reduce((obj, item, index) => {
        obj[item.id] = item;
        return obj;
      }, {})
      return result;
    case GET_POST:
      return state
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
      var result = action.categories.reduce((obj, item, index) => {
        obj[item.name] = item;
        return obj;
      }, {})
      return result
    default:
      return state
  }
}

function comments(state = {}, action) {

  switch(action.type) {
    case GET_COMMENTS:
      var objComments = action.comments.reduce((obj, item, index) => {
        obj[item.id] = item;
        return obj;
      }, {});
      return objComments;
    case COMMENT_VOTEUP:
      return {
        ...state,
        [action.commentID]: {
          ...state[action.commentID],
          voteScore: state[action.commentID].voteScore + 1
        }
      }
    case COMMENT_VOTEDOWN:
      return {
        ...state,
        [action.commentID]: {
          ...state[action.commentID],
          voteScore: state[action.commentID].voteScore - 1
        }
      }
    case COMMENT_NEW:
      // console.log(state,"comment new state");
      // console.log(action,"the full action");
      // console.log(Object.keys(state),"object keys");
      //state[action.comment.id] = action.comment;
      //console.log(state,"full state again");

      return {
        ...state,
          [action.comment.id]: action.comment,
      }
    case COMMENT_DELETE:
      // console.log(state,"comment delete state");
      //
      // console.log(action,"the full action");
      // console.log(Object.keys(state),"object keys");
      // console.log(Object.keys(state).filter((id) => id !== action.commentId))
      //
      // console.log(Object.keys(state)
      //   .filter((id) => id !== action.commentId)
      //     .reduce((obj, item) => {
      //       obj[item] = state[item];
      //       return obj;
      //     }, {}))

      return Object.keys(state)
        .filter((id) => id !== action.commentId)
          .reduce((obj, item) => {
            obj[item] = state[item];
            return obj;
          }, {})
    default:
      return state
  }
}

export default combineReducers({
  posts,
  categories,
  comments,
})
