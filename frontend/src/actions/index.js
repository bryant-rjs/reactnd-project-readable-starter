export const INITIAL_POSTS = 'INITIAL_POSTS';
export const GET_POST = 'GET_POSTS';
export const INITIAL_CATEGORIES = 'INITIAL_CATEGORIES';
export const FETCH_POSTS = 'FETCH_POSTS';
export const VOTE_UP = 'VOTE_UP';
export const VOTE_DOWN = 'VOTE_DOWN';
export const GET_COMMENTS = 'GET_COMMENTS';
export const COMMENT_VOTEUP = 'COMMENT_VOTEUP';
export const COMMENT_VOTEDOWN = 'COMMENT_VOTEDOWN';

export function initialPosts( posts ) {
  return {
    type: INITIAL_POSTS,
    posts
  }
}

export function getPost( posts ) {
  console.log(posts, "what is posts");
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

export function voteUp(postID, index) {
  return {
    type: VOTE_UP,
    postID,
    index,
  }
}

export function voteDown(postID, index) {
  return {
    type: VOTE_DOWN,
    postID,
    index,
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
