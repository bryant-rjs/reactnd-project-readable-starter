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
    .then((res) => res.json())
      .then((data) => data)
}

export function fetchCategories () {
  return fetch(`${api}/categories`, {
    method: 'GET',
    headers: headers
  })
    .then((res) => res.json())
      .then((data) => data)
}
