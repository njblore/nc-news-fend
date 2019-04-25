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
    console.log('this.props.currentUser ->', this.props.currentUser);
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
      })
      .catch(err => console.log(err.response));
    this.setState({ commentValue: '' });
  };
}

export default PostComment;
