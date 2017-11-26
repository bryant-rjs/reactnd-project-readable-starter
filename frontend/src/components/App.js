import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Nav from './Nav';
import Posts from './Posts'
import PostDetails from './PostDetails'
import WritePost from './WritePost'
import { initialPosts, initialCategories } from '../actions'
import * as apiUtils from '../utils/api'

class App extends Component {

  componentDidMount() {
    apiUtils.fetchPosts()
      .then(posts => {
        console.log(posts);
        posts = posts.reduce((arr,cur,i) => {
          arr[i] = cur;
          return arr;
        }, []);
        console.log(posts);
        this.props.initialPosts(posts);
      });

    apiUtils.fetchCategories()
      .then(categories => {
        console.log(categories);
        this.props.initialCategories(categories);
      });

  }

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
function mapStateToProps(state) {
  return {}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialPosts: initialPosts,
    initialCategories: initialCategories,
  }, dispatch)

  // return {
  //   initialPosts: (data) => dispatch(initialPosts(data))
  // }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
