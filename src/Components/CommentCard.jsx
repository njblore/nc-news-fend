import React, { Component } from 'react';
import VoteButtons from './VoteButtons';
import { updateCommentVotes } from '../api';

class CommentCard extends Component {
  state = { commentVote: 0 };
  render() {
    const postedAt = new Date(Date.parse(this.props.comment.created_at));
    return (
      <div className="comment-card">
        {this.props.currentUser && (
          <VoteButtons
            handleCommentVote={this.handleCommentVote}
            comment_id={this.props.comment.comment_id}
            commentVote={this.state.commentVote}
          />
        )}
        <header className="article-header">
          <p>{this.props.comment.author}</p>
          <p>Posted On: {postedAt.toDateString()}</p>
          <p>{this.props.comment.votes + this.state.commentVote} Points</p>
        </header>
        <p>{this.props.comment.body}</p>
      </div>
    );
  }

  handleCommentVote = (vote, comment_id) => {
    updateCommentVotes(comment_id, vote).then(data => {
      this.setState(prevState => {
        return { commentVote: prevState.commentVote + vote };
      });
    });
  };
}

export default CommentCard;
