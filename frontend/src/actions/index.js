export const INITIAL_POSTS = 'INITIAL_POSTS';
export const INITIAL_CATEGORIES = 'INITIAL_CATEGORIES';
export const FETCH_POSTS = 'FETCH_POSTS';

export function initialPosts( posts ) {
  return {
    type: INITIAL_POSTS,
    posts: posts
  }
}

export function initialCategories( categories ) {
  return {
    type: INITIAL_CATEGORIES,
    categories: categories
  }
}

export function fetchPosts() {
  return {
    type: FETCH_POSTS
  }
}
