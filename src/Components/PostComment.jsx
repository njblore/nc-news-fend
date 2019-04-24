import React, { Component } from 'react';
import { postCommentToArticle } from '../api';

class PostComment extends Component {
  state = { commentValue: '' };
  render() {
    return (
      <div className="comment-box">
        <form onSubmit={this.handleSubmit}>
          <textarea
            rows="9"
            value={this.state.commentValue}
            onChange={this.handleTyping}
          />
          <button>Post</button>
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
    }).then(data => console.log(data));
  };
}

export default PostComment;
