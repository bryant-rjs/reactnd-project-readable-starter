import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initialPosts, getPost, voteUp, voteDown } from '../actions'
import * as apiUtils from '../utils/api'
import { capitalize } from '../utils/helpers'

class PostDetails extends Component {
  state = {
    cureCategory: '',
    curPostID: '',
    myPost: null,
    postLoaded: false,
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.state.postLoaded) {
      this.setState(() => ({
        myPost: nextProps.allPosts[this.props.match.params.post_id],
      }))
    }
  }

  componentDidMount() {
    apiUtils.fetchPosts()
      .then(posts => {
        this.props.initialPosts(posts);
      });

    if ( this.props.match.params == null || (Object.getOwnPropertyNames(this.props.match.params).length === 0) ) {

    } else {
      this.setState(() => ({
        curCategory: this.props.match.params.category_name,
        curPostID: this.props.match.params.post_id
      }))
    }

    apiUtils.getPost(this.props.match.params.post_id)
      .then(post => {
        this.setState(() => ({
          myPost: post,
          postLoaded: true,
        }))
      });
  }
  render() {
    if (!this.state.postLoaded) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="category-box">
                <div className="post-title">Loading Post...</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      var postDate = new Date(this.state.myPost.timestamp).toLocaleString();
      return (

          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="category-box">
                  <div className="post-title">{capitalize(this.state.myPost.title)}</div>
                  <div className="post-category">{capitalize(this.state.myPost.category)}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="post-image"></div>
                <div className="post-details position-relative">
                  <div className="post-author">{capitalize(this.state.myPost.author)}</div>
                  <div className="post-timestamp"><small>{postDate}</small></div>
                  <div className="post-score">
                    <span>
                      {(this.state.myPost.voteScore > 0) ? '+' : '' }{this.state.myPost.voteScore}&nbsp;
                    </span>
                    <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                    <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                    <button className="btn-vote" onClick={() => this.props.voteUp(this.state.myPost.id,0)}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></button>
                    <button className="btn-vote" onClick={() => this.props.voteDown(this.state.myPost.id,0)}><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></button>

                  </div>
                </div>
                <div className="post-body">
                  <p>
                    {this.state.myPost.body}
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="comment-title">
                  <h5>Comments</h5>
                  <span className="comments-icon"><i className="fa fa-commenting-o" aria-hidden="true"></i></span>
                </div>

                <ul className="comment-list">
                  <li>
                    <div className="comment-body">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit, nunc rhoncus vestibulum fermentum</p>
                    </div>
                    <div className="comment-content position-relative">
                      <div className="comment-details">
                        <div className="comment-author"><small>Dave Franco</small></div>
                        <div className="comment-timestamp"><small>Nov 12, 2017</small></div>
                      </div>
                      <div className="comment-score">
                          <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                          <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                      </div>
                    </div>
                  </li>
                  <li>Comment</li>
                  <li>Comment</li>
                  <li>Comment</li>
                </ul>
              </div>
            </div>
          </div>
      )
    }
  }
}

function mapStateToProps({posts}) {
  return {
    allPosts: posts,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialPosts: initialPosts,
    getPost: getPost,
    voteUp: voteUp,
    voteDown: voteDown,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)
//export default PostDetails;
