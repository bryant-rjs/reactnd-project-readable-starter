import React, { Component } from 'react';

class PostsControl extends Component {

  render() {
    return (
        <div className="container clearfix">

          {/* <div className="posts-categories">
            <div className="btn-group" data-toggle="buttons">
              <button type="button" className="btn btn-outline-primary active">All</button>
              <button type="button" className="btn btn-outline-primary">Technology</button>
              <button type="button" className="btn btn-outline-primary">Creativity</button>
              <button type="button" className="btn btn-outline-primary">Culture</button>
            </div>
          </div> */}

          <div className="posts-categories">
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link active" href="#">All</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Technology</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Creativity</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Culture</a>
              </li>
            </ul>
          </div>

          <div className="create-post">
            <button className="btn btn-primary">Create New Post <i class="fa fa-pencil" aria-hidden="true"></i></button>
          </div>

        </div>
    )
  }

}

export default PostsControl;
