import React, { Component } from 'react';
import CommentCard from './CommentCard';
import { fetchComments, updateCommentVotes } from '../api';
import VoteButtons from './VoteButtons';
import DeleteButton from './DeleteButton';

class ArticleComments extends Component {
  state = { comments: null, currentCommentVotes: 0 };
  render() {
    return (
      <div className="comments-section">
        <h3>Comments:</h3>
        {this.state.comments &&
          this.state.comments.map(comment => {
            return (
              <div key={comment.comment_id} className="article-link">
                {this.props.currentUser && (
                  <VoteButtons
                    handleCommentVote={this.handleCommentVote}
                    comment_id={comment.comment_id}
                    currentCommentVotes={this.state.currentCommentVotes}
                  />
                )}
                <CommentCard
                  comment={comment}
                  currentCommentVotes={this.state.currentCommentVotes}
                />
                {this.props.currentUser &&
                  this.props.currentUser === comment.author && <DeleteButton />}
              </div>
            );
          })}
      </div>
    );
  }

  handleCommentVote = (vote, comment_id) => {
    updateCommentVotes(comment_id, vote).then(data => {
      this.setState(prevState => {
        return { currentCommentVotes: prevState.currentCommentVotes + vote };
      });
    });
  };

  componentDidMount() {
    fetchComments(this.props.article_id).then(data =>
      this.setState({ comments: data }),
    );
  }
}

export default ArticleComments;
