import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { initialPosts, voteUp, voteDown, deletePost } from '../actions'
import * as apiUtils from '../utils/api'
const uuidv1 = require('uuid/v1');

class Posts extends Component {

  state = {
    ourPosts: [],
    linkCategory: '',
    sort: 'Most Recent',
    loadedPosts: false,
    chosenCategory: ''
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

  handlePostDelete = (postId) => {
    apiUtils.deletePost(postId)
      .then(() => {
        this.props.deletePost(postId);
      });
  }

  handleSortSelect = (string,event) => {
    this.setState({ sort: event.target.value });

    switch(event.target.value) {
      case 'Most Recent': {
        this.props.myPosts.sort((a,b) => {
          const dateA = new Date(a.timestamp);
          const dateB = new Date(b.timestamp);
          return dateB - dateA;
        })
        break;
      }
      case 'Highest Score': {
        this.props.myPosts.sort((a,b) => {
          const scoreA = a.voteScore;
          const scoreB = b.voteScore;
          return  scoreB - scoreA;
        })
        break;
      }
      case 'Lowest Score': {
        this.props.myPosts.sort((a,b) => {
          const scoreA = a.voteScore;
          const scoreB = b.voteScore;
          return scoreA - scoreB;
        })
        break;
      }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.loadedPosts) {
      if ( nextProps.match.params == null || (Object.getOwnPropertyNames(nextProps.match.params).length === 0) ) {
        this.setState(() => ({chosenCategory: ''}))
      }
      else {
        this.setState(() => ({chosenCategory: nextProps.match.params.category_name}))
      }
    }
  }

  componentDidMount = () => {
    apiUtils.fetchPosts()
      .then(posts => {

        this.props.initialPosts(posts);
        var arrPosts = Object.keys(this.props.posts).map((item) => {
          return this.props.posts[item]
        })

        if ( this.props.match.params == null || (Object.getOwnPropertyNames(this.props.match.params).length === 0) ) {
          this.setState(() => ({
            chosenCategory: '',
          }))
        }
        else {
          this.setState(() => ({
            chosenCategory: this.props.match.params.category_name,
          }))
        }

        this.setState(() => ({
          loadedPosts: true
        }))

    })
  }

  render() {

    this.props.myPosts.map((item) => (
      item.date = new Date(item.timestamp).toLocaleString()
    ))

    return (
      <div className="container position-relative">
        <div className="category-box clearfix">
          <div className="category-title">All Posts</div>
          <div className="posts-sort">
            Order By:
            <select value={this.state.sort} onChange={(event) => this.handleSortSelect('',event)}>
              <option>Most Recent</option>
              <option>Highest Score</option>
              <option>Lowest Score</option>
            </select>
          </div>
        </div>

        <div className="posts-lists"></div>

        <ul className="posts-list row">
          {this.props.myPosts
            .filter((cur) => {
              if (this.state.chosenCategory !== '') {
                return cur.category === this.state.chosenCategory
              } else {
                return cur
              }
            })
            .map((post, index) => (
            <li className="col-md-4" key={post.id}>
              <div className="card">
                <div className="card-top">
                  <div className="card-edit">
                    <button className="btn btn-primary">
                      <Link to={`/edit-post/${post.id}`} className="edit-link">
                        <i className="fa fa-pencil" aria-hidden="true"></i> Edit Post
                      </Link>
                    </button>
                  </div>
                  <div className="card-delete">
                    <button onClick={() => this.handlePostDelete(post.id)} className="btn btn-danger"><i className="fa fa-times" aria-hidden="true"></i> Delete</button>
                  </div>
                </div>
                <img className="card-img-top" alt=""/>

                <div className="card-body">
                  <h4 className="card-title">{post.title}</h4>
                  <p className="card-text">{post.body}</p>
                  <Link to={`/category/${post.category}/${post.id}`} className="btn btn-outline-primary">Read More</Link>

                </div>
                <div className="card-footer">
                  <small className="text-muted">{post.date}</small>
                  <div className="score">
                    <span>
                      {(post.voteScore > 0) ? '+' : '' }{post.voteScore}&nbsp;
                    </span>

                    <button className="btn-vote" onClick={() => this.handleVote(post.id,"upVote")}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></button>
                    <button className="btn-vote" onClick={() => this.handleVote(post.id,"downVote")}><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

      </div>

    )
  }
}

function mapStateToProps({posts, categories}) {
  return {
    posts,
    myPosts: Object.keys(posts).map((item) => {
      return posts[item]
    }).sort((a,b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB - dateA;
    }),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialPosts: initialPosts,
    voteUp: voteUp,
    voteDown: voteDown,
    deletePost: deletePost,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
