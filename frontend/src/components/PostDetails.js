import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initialPosts, getPost, voteUp, voteDown, getComments, commentVoteUp, commentVoteDown,
addNewPostComment, deleteComment } from '../actions'
import * as apiUtils from '../utils/api'
import { capitalize } from '../utils/helpers'
const uuidv1 = require('uuid/v1');

class PostDetails extends Component {
  state = {
    cureCategory: '',
    curPostID: '',
    myPost: null,
    postLoaded: false,
    newCommentName: '',
    newCommentText: '',
  }

  handleVote = (postId,direction) => {
    console.log(direction,"the direction");
    var directionData = {
      option: direction,
    }
    apiUtils.scorePost(postId,directionData)
      .then(() => {
        if (directionData.option === 'upVote') this.props.voteUp(postId);
        else this.props.voteDown(postId);
      });
  }

  handleCommentVote = (commentId,direction) => {
    console.log(direction,"the direction");
    var directionData = {
      option: direction,
    }
    apiUtils.scorePostComment(commentId,directionData)
      .then(() => {
        if (directionData.option === 'upVote') this.props.commentVoteUp(commentId);
        else this.props.commentVoteDown(commentId);
      });
  }

  handleCommentDelete = (commentId) => {
    this.props.deleteComment(commentId);
  }

  handleCommentInput = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }
  handleCommentSubmit = (event) => {
    event.preventDefault();
    if (this.state.newCommentName === '' || this.state.newCommentText === '') {
      // do nothing
    } else {

      var newComment = {
        id: uuidv1(),
        timestamp: Date.now(),
        body: this.state.newCommentText,
        author: this.state.newCommentName,
        parentId: this.props.match.params.post_id,
      }

      apiUtils.putPostComment(newComment)
        .then(commentData => {
          //console.log(data);
          this.props.addNewPostComment(commentData);
                  // apiUtils.fetchPostComments(this.props.match.params.post_id)
                  //   .then(comments => {
                  //     // var objComments = comments.reduce((obj, item, index) => {
                  //     //   obj[item.id] = item;
                  //     //   return obj;
                  //     // }, {});
                  //     // this.props.getComments(objComments);
                  //     this.props.getComments(comments);
                  //   });
      });
    }

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

    apiUtils.fetchPostComments(this.props.match.params.post_id)
      .then(comments => {
        // var objComments = comments.reduce((obj, item, index) => {
        //   obj[item.id] = item;
        //   return obj;
        // }, {});
        // this.props.getComments(objComments);
        this.props.getComments(comments);
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
        this.setState({myPost: post})
      })
        .then(() => {
          this.setState({postLoaded:  true})
        })
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
                    <button className="btn-vote" onClick={() => this.handleVote(this.state.myPost.id,"upVote")}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></button>
                    <button className="btn-vote" onClick={() => this.handleVote(this.state.myPost.id,"downVote")}><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></button>
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
                  {this.props.allComments.map((comment) => (
                    <li key={comment.id}>
                      <div className="comment-delete">
                        <button className="btn-delete" onClick={() => this.handleCommentDelete(comment.id)}><i className="fa fa-times" aria-hidden="true"></i></button>
                      </div>
                      <div className="comment-body">
                        <p>{comment.body}</p>
                      </div>
                      <div className="comment-content position-relative">
                        <div className="comment-details">
                          <div className="comment-author"><small>{comment.author}</small></div>
                          <div className="comment-timestamp"><small>{comment.timestamp}</small></div>
                        </div>
                        <div className="comment-score">
                            <span>
                              {(comment.voteScore > 0) ? '+' : '' }{comment.voteScore}&nbsp;
                            </span>
                            <button className="btn-vote" onClick={() => this.handleCommentVote(comment.id,"upVote")}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></button>
                            <button className="btn-vote" onClick={() => this.handleCommentVote(comment.id,"downVote")}><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="comment-writenew">
                  <h5>Write New Comment</h5>
                  <span className="comments-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                </div>
                <div className="comment-writebody">
                  <form onSubmit={this.handleCommentSubmit}>
                    <input name="newCommentName" value={this.state.newCommentName} type="text" placeholder="Your Name" onChange={this.handleCommentInput}/>
                    <textarea name="newCommentText" value={this.state.newCommentText} placeholder="What's on your mind?" rows="3" cols="1" className="comment-input-box" onChange={this.handleCommentInput}/>
                    <input type="submit" value="Post Comment" className="btn btn-info"/>
                  </form>
                </div>

              </div>
            </div>
          </div>
      )
    }
  }
}

function mapStateToProps({posts, comments}) {
  var arrComments = Object.keys(comments).map((item) => {
    var newComment = comments[item];
    newComment.timestamp = new Date(comments[item].timestamp).toLocaleString();
    return newComment;
  });
  arrComments.sort((a,b) => {
    const scoreA = a.voteScore;
    const scoreB = b.voteScore;
    return  scoreB - scoreA;
  });

  return {
    allPosts: posts,
    allComments: arrComments,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialPosts: initialPosts,
    getPost: getPost,
    voteUp: voteUp,
    voteDown: voteDown,
    getComments: getComments,
    commentVoteUp: commentVoteUp,
    commentVoteDown: commentVoteDown,
    addNewPostComment: addNewPostComment,
    deleteComment: deleteComment,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)
//export default PostDetails;
