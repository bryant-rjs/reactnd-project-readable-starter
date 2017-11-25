import React, { Component } from 'react';

class Posts extends Component {

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

          <li className="col-md-4">
            <div className="card">
              <img className="card-img-top" alt=""/>
              <div className="card-body">
                <h4 className="card-title">Card title</h4>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-outline-primary">Go somewhere</a>
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
                <a href="#" className="btn btn btn-outline-primary">Go somewhere</a>
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
                <a href="#" className="btn btn btn-outline-primary">Go somewhere</a>
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
                <a href="#" className="btn btn btn-outline-primary">Go somewhere</a>
              </div>
              <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
          </li>
        </ul>

      </div>

    )
  }

}

export default Posts;
