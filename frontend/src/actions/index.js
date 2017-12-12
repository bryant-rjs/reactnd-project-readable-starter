export const INITIAL_POSTS = 'INITIAL_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const GET_POST = 'GET_POSTS';
export const INITIAL_CATEGORIES = 'INITIAL_CATEGORIES';
export const FETCH_POSTS = 'FETCH_POSTS';
export const VOTE_UP = 'VOTE_UP';
export const VOTE_DOWN = 'VOTE_DOWN';
export const GET_COMMENTS = 'GET_COMMENTS';
export const COMMENT_VOTEUP = 'COMMENT_VOTEUP';
export const COMMENT_VOTEDOWN = 'COMMENT_VOTEDOWN';
export const COMMENT_NEW = 'COMMENT_NEW';
export const COMMENT_DELETE = 'COMMENT_DELETE';
export const COMMENT_UPDATE = 'COMMENT_UPDATE';

export function initialPosts( posts ) {
  return {
    type: INITIAL_POSTS,
    posts
  }
}

export function deletePost( postId ) {
  return {
    type: DELETE_POST,
    postId,
  }
}

export function getPost( posts ) {
  return {
    type: GET_POST,
    posts
  }
}

export function initialCategories( categories ) {
  return {
    type: INITIAL_CATEGORIES,
    categories
  }
}

export function fetchPosts() {
  return {
    type: FETCH_POSTS
  }
}

export function voteUp(postID) {
  return {
    type: VOTE_UP,
    postID,
  }
}

export function voteDown(postID) {
  return {
    type: VOTE_DOWN,
    postID,
  }
}

export function commentVoteUp(commentID) {
  return {
    type: COMMENT_VOTEUP,
    commentID,
  }
}

export function commentVoteDown(commentID) {
  return {
    type: COMMENT_VOTEDOWN,
    commentID,
  }
}

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments,
  }
}

export function addNewPostComment(comment) {
  return {
    type: COMMENT_NEW,
    comment,
  }
}

export function deleteComment(commentId) {
  return {
    type: COMMENT_DELETE,
    commentId,
  }
}

export function updateComment(commentId, commentText) {
  return {
    type: COMMENT_UPDATE,
    commentId,
    commentText,
  }
}
