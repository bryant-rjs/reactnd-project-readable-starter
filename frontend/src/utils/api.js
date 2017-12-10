const api = 'http://localhost:3001';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'bRy4n7'
}

export function fetchPosts () {
  return fetch(`${api}/posts`, {
    method: 'GET',
    headers: headers
  })
    .then((response) => response.json())
      .then((data) => data)
}
export function getPost(postID) {
  return fetch(`${api}/posts/${postID}`, {
    method: 'GET',
    headers: headers
  })
    .then((response) => response.json())
      .then((data) => data)
}
export function newPost(postData) {
  console.log(postData,"post data");
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify( postData ),
  })
    .then((response) => response.json())
      .then((data) => data)
}
export function deletePost(postId) {
  console.log(postId,"post id delete post");
  return fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: headers,
  })
    .then((response) => response.json())
      .then((data) => data)
}

export function fetchCategories () {
  return fetch(`${api}/categories`, {
    method: 'GET',
    headers: headers
  })
    .then((response) => response.json())
      .then((data) => data)
}

export function fetchPostComments(postID) {
  return fetch(`${api}/posts/${postID}/comments`, {
    method: 'GET',
    headers: headers
  })
    .then((response) => response.json())
      .then((data) => data)
}

export function putPostComment(newComment) {
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify( newComment ),
  })
    .then((response) => response.json())
      .then((data) => data)
}

export function deleteComment(commentId) {
  return fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: headers,
  })
    .then((response) => response.json())
      .then((data) => data)
}
