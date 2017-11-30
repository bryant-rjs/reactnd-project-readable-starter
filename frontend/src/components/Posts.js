import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { initialPosts, voteUp } from '../actions'
import * as apiUtils from '../utils/api'
const uuidv1 = require('uuid/v1');

class Posts extends Component {

  state = {
    ourPosts: [],
    linkCategory: '',
    sort: 'Date',
  }

  handleSortSelect = (string,event) => {
    console.log(event.target.value);
    this.setState({ sort: event.target.value });

    switch(event.target.value) {
      case 'Date': {
        this.state.ourPosts.sort((a,b) => {
          const dateA = new Date(a.timestamp);
          const dateB = new Date(b.timestamp);
          return dateB - dateA;
        })
        break;
      }
      case 'Highest Score': {
        this.state.ourPosts.sort((a,b) => {
          const scoreA = a.voteScore;
          const scoreB = b.voteScore;
          return  scoreA + scoreB;
        })
        break;
      }
      case 'Lowest Score': {
        this.state.ourPosts.sort((a,b) => {
          const scoreA = a.voteScore;
          const scoreB = b.voteScore;
          return scoreA - scoreB;
        })
        break;
      }
    }

  }

  componentWillReceiveProps = (nextProps) => {
    if ( nextProps.match.params == null || (Object.getOwnPropertyNames(nextProps.match.params).length === 0) ) {
      this.setState(() => ({
        ourPosts: this.props.posts
      }))
    }
    else {
      this.setState(() => ({
        ourPosts: this.props.posts.filter((post) => (
          post.category === nextProps.match.params.category_name
        ))
      }))
    }
  }

  componentDidMount = () => {

    apiUtils.fetchPosts()
      .then(posts => {

        this.props.initialPosts(posts);

        var monkey = Object.keys(this.props.posts).map((item) => {
          // console.log(item);
          // console.log(this.props.posts[item]);
          return this.props.posts[item]
        });
        console.log(monkey);

        if ( this.props.match.params == null || (Object.getOwnPropertyNames(this.props.match.params).length === 0) ) {
          this.setState(() => ({
            ourPosts: monkey
          }))
        }
        else {
          this.setState(() => ({
            ourPosts:
              monkey.filter((post) => (
                post.category === this.props.match.params.category_name
              ))

          }))
        }
        console.log(this.state.ourPosts);
    })
  }

  render() {

    return (
      <div className="container position-relative">
        <div className="category-box clearfix">
          <div className="category-title">All Posts</div>
          <div className="posts-sort">
            Order By:
            <select value={this.state.sort} onChange={(event) => this.handleSortSelect('',event)}>
              <option>Date</option>
              <option>Highest Score</option>
              <option>Lowest Score</option>
            </select>
          </div>
        </div>

        <div className="posts-lists"></div>
        <ul className="posts-list row">
          {this.state.ourPosts
            .map((post, index) => (
            <li className="col-md-4" key={post.id}>
              <div className="card">
                <img className="card-img-top" alt=""/>
                <div className="card-body">
                  <h4 className="card-title">{post.title}</h4>
                  <p className="card-text">{post.body}</p>
                  <Link to={`/category/${post.category}/${post.id}`} className="btn btn-outline-primary">Read More</Link>

                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 3 mins ago</small>
                  <div className="score">
                    <span>
                      {(post.voteScore > 0) ? '+' : '' }{post.voteScore}&nbsp;
                    </span>
                    <i onClick={() => voteUp({post})} className="fa fa-thumbs-o-up" aria-hidden="true"></i>&nbsp;
                    <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                    <button onClick={() => this.props.voteUp({post,index})}>asdfsdf</button>
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
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialPosts: initialPosts,
    voteUp: voteUp,
  }, dispatch)

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
//export default Posts;
