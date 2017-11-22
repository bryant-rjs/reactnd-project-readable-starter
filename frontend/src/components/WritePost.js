import React, { Component } from 'react';

class WritePost extends Component {

  render() {
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

            <form class="form-write" action="">
              <div className="write-category">
                <span class="write-category-title"><h6>Post to Category:</h6></span>
                <ul className="category-radio">
                  <li className="radio">
                    <label class="btn btn-outline-primary">
                      <input name="category" type="radio" value="option1" checked={true} />
                      Technology
                    </label>
                  </li>
                  <li className="radio">
                    <label class="btn btn-outline-primary">
                      <input name="category" type="radio" value="option2" />
                      Creativity
                    </label>
                  </li>
                  <li className="radio">
                    <label class="btn btn-outline-primary">
                      <input name="category" type="radio" value="option3" />
                      Culture
                    </label>
                  </li>
                </ul>
              </div>

              <div className="user-details">
                <div className="user-image"></div>
                <input type="text" placeholder="Your Name"/>
                <div className="user-nickname">Grand Master Illusionist</div>
              </div>

              <div className="write-details">
                <input name="write-title" type="text" placeholder="Post Title"/>
              </div>
              <div className="write-body">
                <textarea name="write-body" id="" placeholder="Type your text"></textarea>
              </div>
              <input type="submit" value="Create Post" class="btn btn-primary"/>
            </form>

          </div>
        </div>
      </div>
    )
  }

}

export default WritePost;
