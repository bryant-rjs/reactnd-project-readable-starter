export const INITIAL_POSTS = 'INITIAL_POSTS';
export const INITIAL_CATEGORIES = 'INITIAL_CATEGORIES';
export const FETCH_POSTS = 'FETCH_POSTS';
export const VOTE_UP = 'VOTE_UP';
export const VOTE_DOWN = 'VOTE_DOWN';

export function initialPosts( posts ) {
  return {
    type: INITIAL_POSTS,
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
