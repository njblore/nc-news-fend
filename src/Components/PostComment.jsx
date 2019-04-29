import React, { Component } from 'react';
import { postCommentToArticle } from '../api';

class PostComment extends Component {
  state = { commentValue: '' };
  render() {
    const {commentValue} = this.state
    const {toggleShowPostComment} = this.props
    return (
      <div className="comment-box popup">
        <form onSubmit={this.handleSubmit}>
          <textarea
            rows=""
            value={commentValue}
            onChange={this.handleTyping}
            className="form-text"
          />
          <div className="form-buttons">
            <button type="submit" className="good-button">
              Post
            </button>
            <button
              onClick={toggleShowPostComment}
              className="bad-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  handleTyping = e => {
    this.setState({ commentValue: e.target.value });
  };

  handleSubmit = e => {
    const {commentValue} = this.state
    const {currentUser, article_id, updateComments, toggleShowPostComment, toggleError} = this.props
    e.preventDefault();
    commentValue !== ''
      ? postCommentToArticle({
          username: currentUser,
          body: commentValue,
          article_id: article_id,
        })
          .then(data => {
            data.comment.author = data.comment.created_by;
            updateComments(data.comment);
            toggleShowPostComment();
          })
          .catch(err => {
            toggleShowPostComment();
            toggleError();
          })
      : toggleError();
    this.setState({ commentValue: '' });
  };
}

export default PostComment;
