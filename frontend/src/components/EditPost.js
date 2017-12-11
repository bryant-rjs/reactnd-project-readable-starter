import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initialCategories } from '../actions'
import { capitalize } from '../utils/helpers'
import * as apiUtils from '../utils/api'
import { Redirect  } from 'react-router-dom';
const uuidv1 = require('uuid/v1');

class WritePost extends Component {
  state = {
    categoriesLoaded: false,
    category: '',
    selectedCategory: 'react',
    newPostTitle: '',
    newPostBody: '',
    newPostName: '',
    postSubmitted: false,
  }

  handleInputChange = (event) => {
    console.log(event.target.name);
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  handleEditPostSubmit = (event) => {
    event.preventDefault();
    var postData = {
      id: uuidv1(),
      timestamp: Date.now(),
      title: this.state.newPostTitle,
      body: this.state.newPostBody,
      author: this.state.newPostName,
      category: this.state.selectedCategory,
    }

    apiUtils.newPost(postData)
      .then(() => {
        this.setState({postSubmitted: true})
      });
  }
  handleCategoryChange = (e) => {
    this.setState({selectedCategory: e.target.value});
  }
  componentWillReceiveProps(nextProps) {

  }
  componentDidMount() {
    this.setState({categoriesLoaded: true});
    apiUtils.getPost(this.props.match.params.post_id)
      .then((post) => {
        console.log(post, "got the post");
        this.setState({
          newPostTitle: post.title,
          newPostBody: post.body,
          newPostName: post.author,
          selectedCategory: post.category,
        })
      })
  }

  render() {
    //console.log(this.state);
    if(!this.state.categoriesLoaded) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="category-box">
                <div className="post-title">Loading Edit Post Settings...</div>
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
                <div className="post-title">Edit Post</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {this.state.postSubmitted && (
                <Redirect to='/'/>
              )}
              <form className="form-write" action="" onSubmit={this.handleEditPostSubmit}>
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
                <input type="submit" value="Update Post" className="btn btn-primary"/>
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
  mapDispatchToProps,
)(WritePost);
