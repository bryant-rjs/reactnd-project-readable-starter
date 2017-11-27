import React, { Component } from 'react';

import PostsControl from './PostsControl';


class Nav extends Component {
  
  render() {
    return (
        <nav className="navigation">
          <div className="container position-relative">
            <div className="site-title">Magellan</div>
          </div>
          <PostsControl/>
        </nav>
    )
  }
}

export default Nav;
