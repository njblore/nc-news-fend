import React, { Component } from 'react';
import VoteButtons from './VoteButtons';
import { updateCommentVotes, deleteComment } from '../api';
import DeleteButton from './DeleteButton';

class CommentCard extends Component {
  state = { commentVote: 0, showComment: true };
  render() {
    const postedAt = new Date(Date.parse(this.props.comment.created_at));
    return (
      this.state.showComment && (
        <div className="comment-card">
          <div className="comment-votes flex">
            {this.props.currentUser && (
              <VoteButtons
                handleCommentVote={this.handleCommentVote}
                comment_id={this.props.comment.comment_id}
                commentVote={this.state.commentVote}
              />
            )}
            <p>{this.props.comment.votes + this.state.commentVote} Points</p>
          </div>
          <main className="comment-body">
            <header className="comment-header">
              <p>{this.props.comment.author}</p>
              <p>Posted On: {postedAt.toDateString()}</p>
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
      )
    );
  }

  handleDelete = comment_id => {
    deleteComment(comment_id).then(() => this.setState({ showComment: false }));
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
