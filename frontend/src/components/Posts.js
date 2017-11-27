import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initialPosts } from '../actions'
import * as apiUtils from '../utils/api'
const uuidv1 = require('uuid/v1');

class Posts extends Component {

  state = {
    ourPosts: [],
    linkCategory: '',
  }

  componentWillReceiveProps = (nextProps) => {
    console.log("asdf");
  }
  componentDidUpdate = () => {
    console.log("yay");
  }

  componentDidMount = () => {
    apiUtils.fetchPosts()
      .then(posts => {
        // posts = posts.reduce((obj,cur,i) => {
        //   obj[i] = cur;
        //   return obj;
        // }, {});
        this.props.initialPosts(posts);
        this.setState(() => ({
          ourPosts: posts,
        }))
    });
  }

  componentDidUpdate = () => {

    if ( this.props.match == null ) {
      this.state.ourPosts = this.props.posts;
    }
    else {
      this.state.ourPosts = this.props.posts.filter((post) => (
        post.category == this.props.match.params.category_name
      ))
    }
  }



  render() {


    return (
      <div className="container position-relative">
        <div className="category-box clearfix">
          <div className="category-title">All Posts</div>
          <div className="posts-sort">
            Order By:
            <select>
              <option>Date</option>
              <option>Highest Score</option>
              <option>Lowest Score</option>
            </select>
          </div>
        </div>

        <div className="posts-lists"></div>
        <ul className="posts-list row">
          {this.state.ourPosts
            .map((post) => (
            <li className="col-md-4" key={post.id}>
              <div className="card">
                <img className="card-img-top" alt=""/>
                <div className="card-body">
                  <h4 className="card-title">{post.title}</h4>
                  <p className="card-text">{post.body}</p>
                  <a className="btn btn-outline-primary">Read More</a>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 3 mins ago</small>
                  <div className="score">
                    <span>
                      {(post.voteScore > 0) ? '+' : '' }{post.voteScore}&nbsp;
                    </span>
                    <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>&nbsp;
                    <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </li>
          ))}

          {/* <li className="col-md-4">
            <div className="card">
              <img className="card-img-top" alt=""/>
              <div className="card-body">
                <h4 className="card-title">Card title</h4>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a className="btn btn-outline-primary">Go somewhere</a>
              </div>
              <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
                <div className="score">
                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </li>

          <li className="col-md-4">
            <div className="card">
              <img className="card-img-top" alt=""/>
              <div className="card-body">
                <h4 className="card-title">Card title</h4>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a className="btn btn btn-outline-primary">Go somewhere</a>
              </div>
              <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
          </li>

          <li className="col-md-4">
            <div className="card">
              <img className="card-img-top" alt=""/>
              <div className="card-body">
                <h4 className="card-title">Card title</h4>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a className="btn btn btn-outline-primary">Go somewhere</a>
              </div>
              <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
          </li>

          <li className="col-md-4">
            <div className="card">
              <img className="card-img-top" alt=""/>
              <div className="card-body">
                <h4 className="card-title">Card title</h4>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a className="btn btn btn-outline-primary">Go somewhere</a>
              </div>
              <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
          </li> */}
        </ul>

      </div>

    )
  }

}

function mapStateToProps({posts, categories}) {
  return {
    posts,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialPosts: initialPosts,
  }, dispatch)

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
//export default Posts;
