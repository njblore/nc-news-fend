import React, { Component } from 'react';
import { postCommentToArticle } from '../api';

class PostComment extends Component {
  state = { commentValue: '', commentError: false };
  render() {
    return (
      <div className="comment-box popup">
        {this.state.commentError && (
          <p>Woops something went wrong with you comment</p>
        )}
        <form onSubmit={this.handleSubmit}>
          <textarea
            rows=""
            value={this.state.commentValue}
            onChange={this.handleTyping}
            className="form-text"
          />
          <div className="form-buttons">
            <button type="submit" className="good-button">
              Post
            </button>
            <button
              onClick={this.props.toggleShowPostComment}
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
    e.preventDefault();
    this.state.commentValue !== ''
      ? postCommentToArticle({
          username: this.props.currentUser,
          body: this.state.commentValue,
          article_id: this.props.article_id,
        })
          .then(data => {
            console.log('response from postComentToArticle ->', data);
            data.comment.author = data.comment.created_by;
            this.props.updateComments(data.comment);
            this.props.toggleShowPostComment();
          })
          .catch(err => {
            this.props.toggleShowPostComment();
            this.setState({ commentError: true });
          })
      : this.setState({ commentError: true });
    this.setState({ commentValue: '', commentError: false });
  };
}

export default PostComment;
