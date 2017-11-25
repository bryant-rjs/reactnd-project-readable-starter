import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Nav from './Nav';
import PostsControl from './PostsControl';
import Posts from './Posts'
import PostDetails from './PostDetails'
import WritePost from './WritePost'
import { fetchPosts } from '../actions'

function componentDidMount() {
  this.props.fetchPosts();

  

}

class App extends Component {
  render() {
    return (

      <div>
        <Nav/>

        <Posts/>

        <PostDetails/>

        <WritePost/>

      </div>
    );
  }
}
function mapStateToProps() {

}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchPosts: fetchPosts}, dispatch)

  // return {
  //   fetchPosts: (data) => dispatch(fetchPosts(data))
  // }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
