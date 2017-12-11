import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PostsControl from './PostsControl';


class Nav extends Component {

  render() {
    return (
        <nav className="navigation">
          <div className="container position-relative">
            <div className="site-title">
              <Link to='/' className="site-title-link">Magellan</Link>
            </div>
          </div>
          <PostsControl/>
        </nav>
    )
  }
}

export default Nav;
