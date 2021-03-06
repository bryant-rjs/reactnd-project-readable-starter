import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { initialPosts, getPost, voteUp, voteDown, getComments, commentVoteUp, commentVoteDown,
addNewPostComment, deleteComment, updateComment } from '../actions'
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
    postDeleted: false,
    editingComment: false,
    editCommentName: '',
    editCommentText: '',
    editCommentId: '',
    postMsg: "Loading Post...",
  }

  handlePostDelete = (postId) => {
    apiUtils.deletePost(postId)
      .then(() => {
        this.setState({postDeleted: true})
      });
  }

  handleVote = (postId,direction) => {
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
    apiUtils.deleteComment(commentId)
      .then(() => {
        this.props.deleteComment(commentId);
      });
  }

  handleCommentInput = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }
  handleCommentEdit = (comment) => {
    this.setState(() => ({
      editingComment: true,
      editCommentName: comment.author,
      editCommentText: comment.body,
      editCommentId: comment.id,
    }))
  }
  handleCommentUpdate = (event) => {
    event.preventDefault();
    var commentData = {
      timestamp: Date.now(),
      body: this.state.editCommentText,
    }
    apiUtils.updateComment(this.state.editCommentId, commentData)
      .then(commentData => {
        this.setState(() => ({
          editingComment: false,
        }))

        this.props.updateComment(this.state.editCommentId, this.state.editCommentText);
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
          this.props.addNewPostComment(commentData);
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

    if ( this.props.match.params == null || (Object.getOwnPropertyNames(this.props.match.params).length === 0) ) {

    } else {
      this.setState(() => ({
        curCategory: this.props.match.params.category_name,
        curPostID: this.props.match.params.post_id
      }))

      apiUtils.fetchPostComments(this.props.match.params.post_id)
        .then(comments => {
          this.props.getComments(comments);
        });

      apiUtils.getPost(this.props.match.params.post_id)
        .then(post => {
          if(!post.error) {
            this.setState(() => ({
              myPost: post
            }))
          }
          return post;
        })
          .then((post) => {
            if(!post.error) {
              this.setState({postLoaded: true})
            }
            else {
              this.setState({postMsg: "There was an error loading this post."})
            }
          })
    }

  }
  render() {
    if (!this.state.postLoaded) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="category-box">
                <div className="post-title">{this.state.postMsg}</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      if (this.state.myPost !== null)
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

                <div className="post-controls position-relative">
                  <div className="card-top">
                    <div className="card-edit">
                      <button className="btn btn-primary">
                        <Link to={`/edit-post/${this.state.myPost.id}`} className="edit-link">
                          <i className="fa fa-pencil" aria-hidden="true"></i> Edit Post
                        </Link>
                      </button>
                    </div>
                    <div className="card-delete">
                      <button onClick={() => this.handlePostDelete(this.state.myPost.id)} className="btn btn-danger">
                        <i className="fa fa-times" aria-hidden="true"></i> Delete
                      </button>
                    </div>
                  </div>
                  {this.state.postDeleted && (
                    <Redirect to='/'/>
                  )}
                </div>

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
                <div className={this.state.editingComment ? 'hide-list-view' : 'show-list-view' + ' comment-list-view'}>
                  <div className="comment-title">
                    <h5>Comments</h5>
                    <span className="comments-icon"><i className="fa fa-commenting-o" aria-hidden="true"></i></span>
                  </div>

                  <ul className="comment-list">
                    {this.props.allComments.map((comment) => (
                      <li key={comment.id}>
                        <div className="comment-control">
                          <div className="comment-edit">
                            <button className="btn-edit" onClick={() => this.handleCommentEdit(comment)}>
                              <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                            </button>
                          </div>
                          <div className="comment-delete">
                            <button className="btn-delete" onClick={() => this.handleCommentDelete(comment.id)}><i className="fa fa-times" aria-hidden="true"></i></button>
                          </div>
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

                <div className={this.state.editingComment ? 'show-write-view' : 'hide-write-view' + ' comment-write-view'}>
                  <div className="comment-writenew">
                    <h5>Edit Comment</h5>
                    <span className="comments-icon"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                  </div>
                  <div className="comment-writebody">
                    <form onSubmit={this.handleCommentUpdate}>
                      <input className="comment-name-editing" name="editCommentName" value={this.state.editCommentName} readOnly type="text" />
                      <textarea name="editCommentText" value={this.state.editCommentText} rows="3" cols="1" className="comment-input-box" onChange={this.handleCommentInput}/>
                      <input type="submit" value="Update Comment" className="btn btn-info"/>
                    </form>
                  </div>
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
    updateComment: updateComment,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails)
