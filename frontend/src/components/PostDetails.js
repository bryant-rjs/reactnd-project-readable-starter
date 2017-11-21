import React, { Component } from 'react';

class PostDetails extends Component {

  render() {
    return (

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="category-box">
                <div className="post-title">Title</div>
                <div className="post-category">Category</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8">
              <div className="post-image"></div>
              <div className="post-details position-relative">
                <div className="post-author">Author</div>
                <div className="post-timestamp"><small>Nov 11, 2017</small></div>
                <div className="post-score">
                  <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
                </div>
              </div>
              <div className="post-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit, nunc rhoncus vestibulum fermentum, augue lacus condimentum nisl, a pellentesque metus ex in elit. Morbi condimentum condimentum lacus, eu efficitur libero rhoncus non. Suspendisse eu mattis tortor. Sed semper enim a neque maximus finibus. Mauris feugiat enim ut nunc fringilla, commodo consectetur metus scelerisque. Integer suscipit metus venenatis tortor malesuada auctor. Suspendisse cursus feugiat augue.
                </p>
                <p>
                  Nam augue velit, suscipit a molestie vitae, tincidunt a libero. Nullam augue arcu, placerat accumsan finibus sed, varius sed nunc. Duis fringilla sed libero quis lobortis. Nulla ut commodo odio, et volutpat justo. Aenean id feugiat magna, sit amet semper dolor. Sed porttitor purus dolor, semper suscipit elit venenatis eget. Cras in faucibus elit.
                </p>
              </div>

            </div>
            <div className="col-md-4">
              <div className="comment-title">
                <h5>Comments</h5>
                <span class="comments-icon"><i class="fa fa-commenting-o" aria-hidden="true"></i></span>
              </div>

              <ul className="comment-list">
                <li>
                  <div className="comment-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit, nunc rhoncus vestibulum fermentum</p>
                  </div>
                  <div className="comment-content position-relative">
                    <div className="comment-details">
                      <div className="comment-author"><small>Dave Franco</small></div>
                      <div className="comment-timestamp"><small>Nov 12, 2017</small></div>
                    </div>
                    <div className="comment-score">
                        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                        <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
                    </div>
                  </div>
                </li>
                <li>Comment</li>
                <li>Comment</li>
                <li>Comment</li>
              </ul>
            </div>
          </div>
        </div>
    )
  }

}

export default PostDetails;
