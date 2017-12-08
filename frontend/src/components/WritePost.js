import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initialCategories } from '../actions'
import { capitalize } from '../utils/helpers'
import * as apiUtils from '../utils/api'
const uuidv1 = require('uuid/v1');

class WritePost extends Component {
  state = {
    categoriesLoaded: false,
    category: '',
    selectedCategory: 'react',
    newPostTitle: '',
    newPostBody: '',
    newPostName: '',
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  handleWritePostChange = () => {

  }
  handleWritePostSubmit = (event) => {
    event.preventDefault();
    var newPost = {
      id: uuidv1(),
      timestamp: Date.now(),
      title: this.state.newPostTitle,
      body: this.state.newPostBody,
      author: this.state.newPostName,
      category: '',
    }
  }
  handleCategoryChange = (e) => {
    console.log(e.target.value);
    this.setState({selectedCategory: e.target.value});
  }
  componentWillReceiveProps(nextProps) {
    this.setState({categoriesLoaded: true});
  }
  componentDidMount() {

  }

  render() {

    if(!this.state.categoriesLoaded) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="category-box">
                <div className="post-title">Loading New Post Settings...</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="category-box">
                <div className="post-title">Create New Post</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">

              <form className="form-write" action="" onChange={this.handleWritePostChange} onSubmit={this.handleWritePostSubmit}>
                <div className="write-category">
                  <span className="write-category-title"><h6>Post to Category:</h6></span>
                  <ul className="category-radio">
                    {this.props.myCategories.map((category,index) => (
                      <li className="radio" key={`${category.name}2`}>
                        <label className="btn btn-outline-primary">
                          <input name="category" type="radio" checked={this.state.selectedCategory === category.name} value={category.name} onChange={this.handleCategoryChange} />
                          {capitalize(category.name)}
                        </label>
                      </li>
                    ))}
                    {/* <li className="radio">
                      <label className="btn btn-outline-primary">
                        <input name="category" type="radio" value="option1" checked={true} onChange={event => this.handleQuery(event.target.value)} />
                        Technology
                      </label>
                    </li>
                    <li className="radio">
                      <label className="btn btn-outline-primary">
                        <input name="category" type="radio" value="option2" onChange={event => this.handleQuery(event.target.value)} />
                        Creativity
                      </label>
                    </li>
                    <li className="radio">
                      <label className="btn btn-outline-primary">
                        <input name="category" type="radio" value="option3" onChange={event => this.handleQuery(event.target.value)} />
                        Culture
                      </label>
                    </li> */}
                  </ul>
                </div>

                <div className="user-details">
                  <div className="user-image"></div>
                  <input name="newPostName" type="text" value={this.state.newPostName} onChange={this.handleInputChange} placeholder="Your Name"/>
                  <div className="user-nickname">Grand Master Illusionist</div>
                </div>

                <div className="write-details">
                  <input name="newPostTitle" type="text" value={this.state.newPostTitle} onChange={this.handleInputChange} placeholder="Post Title"/>
                </div>
                <div className="write-body">
                  <textarea name="newPostBody" id="" value={this.state.newPostBody} onChange={this.handleInputChange} placeholder="Type your text"></textarea>
                </div>
                <input type="submit" value="Create Post" className="btn btn-primary"/>
              </form>

            </div>
          </div>
        </div>
      )
    }
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
)(WritePost);
