import React, { Component } from 'react';
import { postCommentToArticle } from '../api';

class PostComment extends Component {
  state = { commentValue: '' };
  render() {
    return (
      <div className="comment-box popup">
        <form onSubmit={this.handleSubmit}>
          <textarea
            rows=""
            value={this.state.commentValue}
            onChange={this.handleTyping}
          />
          <button>Post</button>
          <button
            onClick={this.props.toggleShowPostComment}
            className="bad-button"
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }

  handleTyping = e => {
    this.setState({ commentValue: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    postCommentToArticle({
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
      .catch(err => console.log(err.response));
    this.setState({ commentValue: '' });
  };
}

export default PostComment;
