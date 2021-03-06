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
              {this.props.myCategories.map((category) => (
                <li className="nav-item" key={category.name}>
                  <Link to={`/category/${category.name}`} className="nav-link">{capitalize(category.name)}</Link>
                </li>
              ))}

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
    myCategories: Object.keys(categories).map((item) => {
      return categories[item]
    }),
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
