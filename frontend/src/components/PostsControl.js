import React, { Component } from 'react';

class PostsControl extends Component {

  render() {
    return (
        <div className="container clearfix">

          <div className="posts-categories">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link active">All</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Technology</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Creativity</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Culture</a>
              </li>
            </ul>
          </div>

          <div className="create-post">
            <button className="btn btn-primary">Create New Post <i className="fa fa-pencil" aria-hidden="true"></i></button>
          </div>

        </div>
    )
  }

}

export default PostsControl;
