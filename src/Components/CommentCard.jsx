import React, { Component } from 'react';
import VoteButtons from './VoteButtons';
import { updateCommentVotes, deleteComment } from '../api';
import DeleteButton from './DeleteButton';
import Loading from './Loading';

class CommentCard extends Component {
  state = { commentVote: 0, showComment: true, voteLoading: false };
  render() {
    const {commentVote, showComment, voteLoading} = this.state
    const {currentUser, comment} = this.props
    const postedAt = new Date(Date.parse(this.props.comment.created_at));
    return (
      showComment && (
        <div className="comment-card">
          {voteLoading && <Loading />}
          <div className="comment-votes flex">
            {currentUser && (
              <VoteButtons
                handleCommentVote={this.handleCommentVote}
                comment_id={comment.comment_id}
                commentVote={commentVote}
              />
            )}
            <p>{comment.votes + commentVote} Points</p>
          </div>
          <main className="comment-body">
            <header className="comment-header">
              <p>{comment.author}</p>
              <p>Posted On: {postedAt.toDateString()}</p>
            </header>
            <p>{comment.body}</p>
            {currentUser &&
              currentUser === comment.author && (
                <DeleteButton
                  handleDelete={() =>
                    this.handleDelete(comment.comment_id)
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
    this.setState({ voteLoading: true }, () => {
      updateCommentVotes(comment_id, vote).then(data => {
        this.setState(prevState => {
          return {
            commentVote: prevState.commentVote + vote,
            voteLoading: false,
          };
        });
      });
    });
  };
}

export default CommentCard;
