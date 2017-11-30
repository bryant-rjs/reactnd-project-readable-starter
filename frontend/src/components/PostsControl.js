import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as apiUtils from '../utils/api'
import { capitalize } from '../utils/helpers'
import { initialCategories } from '../actions'
const uuidv1 = require('uuid/v1');

class PostsControl extends Component {
  state = {
    ourCategories: [],
  }
  componentDidMount() {
    apiUtils.fetchCategories()
      .then(categories => {
        this.props.initialCategories(categories['categories']);
      });
  }


  render() {
    const { categories } = this.props;
    return (
        <div className="container clearfix">

          <div className="posts-categories">
            <ul className="nav">
              <li className="nav-item ">
                <Link to="/" className="nav-link">All</Link>
              </li>
              {this.state.ourCategories.map((category) => (
                <li className="nav-item" key={category.name}>
                  <Link to={`/category/${category.name}`} className="nav-link">{capitalize(category.name)}</Link>
                </li>
              ))}
              {/* <li className="nav-item">
                <a className="nav-link">All</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Technology</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Creativity</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Culture</a>
              </li> */}
            </ul>
          </div>

          <div className="create-post">
            <Link to='/write-post'>
              <button className="btn btn-primary" href="/">Create New Post <i className="fa fa-pencil" aria-hidden="true"></i></button>
            </Link>
          </div>

        </div>
    )
  }

}

function mapStateToProps({posts, categories}) {
  return {
    categories,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialCategories: initialCategories,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsControl)
//export default PostsControl;
