import React, { Component } from 'react';
import Nav from './Nav';
import PostsControl from './PostsControl';
import Posts from './Posts'
import PostDetails from './PostDetails'

class App extends Component {
  render() {
    return (

      <div>
        <Nav/>

        <Posts/>

        <PostDetails/>

      </div>
    );
  }
}

export default App;
