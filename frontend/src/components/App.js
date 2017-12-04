import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Nav from './Nav';
import Posts from './Posts'
import PostDetails from './PostDetails'
import WritePost from './WritePost'
import { initialPosts, initialCategories } from '../actions'
import * as apiUtils from '../utils/api'

class App extends Component {
  componentWillReceiveProps = (nextProps) => {

  }
  componentDidUpdate = () => {

  }
  componentDidMount = () => {

  }
  render() {

    return (

      <div className="app">
        <Nav/>

        <Route exact path='/' component={Posts}/>

        <Route exact path='/category/:category_name' component={Posts}/>

        <Route exact path='/category/:category_name/:post_id' component={PostDetails} />

        <Route exact path='/write-post/' render={() => (
          <WritePost/>
        )}/>

      </div>
    );
  }
}
function mapStateToProps({posts, categories}) {
  return {
    posts,
    categories,
  }
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
