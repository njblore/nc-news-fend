import React, { Component } from 'react';
import VoteButtons from './VoteButtons';
import { updateCommentVotes, deleteComment } from '../api';
import DeleteButton from './DeleteButton';

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
        <main className="comment-body">
          <header className="article-header">
            <p>{this.props.comment.author}</p>
            <p>Posted On: {postedAt.toDateString()}</p>
            <p>{this.props.comment.votes + this.state.commentVote} Points</p>
          </header>
          <p>{this.props.comment.body}</p>
          {this.props.currentUser &&
            this.props.currentUser === this.props.comment.author && (
              <DeleteButton
                handleDelete={() =>
                  this.handleDelete(this.props.comment.comment_id)
                }
              />
            )}
        </main>
      </div>
    );
  }

  handleDelete = comment_id => {
    deleteComment(comment_id);
  };

  handleCommentVote = (vote, comment_id) => {
    updateCommentVotes(comment_id, vote).then(data => {
      this.setState(prevState => {
        return { commentVote: prevState.commentVote + vote };
      });
    });
  };
}

export default CommentCard;
