import React, { Component } from 'react';
import CommentCard from './CommentCard';
import { fetchComments } from '../api';
import PostComment from './PostComment';

class ArticleComments extends Component {
  state = {
    comments: null,
    showPostComment: false,
    newComments: [],
    noComments: false,
    commentError: false,
  };
  render() {
    const {comments, showPostComment, newComments, noComments, commentError} = this.state
    const {currentUser, article_id} = this.props
    return (
      <div className="comments-section">
        {noComments ? (
          <p>Be the first to comment!</p>
        ) : (
          <h3>Comments:</h3>
        )}
        {currentUser && currentUser !== 'Guest' && (
          <button onClick={this.toggleShowPostComment}>Post A Comment</button>
        )}
        {commentError && (
          <div className="comment-error popup">
            <p>
              Oh no! Something went wrong with your comment, please try again
              soon :(
            </p>
            <button onClick={this.toggleError} className="bad-button">
              Ok
            </button>
          </div>
        )}
        {showPostComment && (
          <PostComment
            article_id={article_id}
            currentUser={currentUser}
            updateComments={this.updateComments}
            toggleShowPostComment={this.toggleShowPostComment}
            toggleError={this.toggleError}
          />
        )}
        {comments &&
          [...newComments, ...comments].map(comment => {
            return (
              <div key={comment.comment_id} className="article-link">
                <CommentCard
                  comment={comment}
                  currentUser={currentUser}
                />
              </div>
            );
          })}
      </div>
    );
  }

  toggleShowPostComment = () => {
    this.setState(prevState => {
      return { showPostComment: !prevState.showPostComment };
    });
  };

  toggleError = () => {
    this.setState(prevState => {
      return { commentError: !prevState.commentError };
    });
  };

  updateComments = comment => {
    this.setState(prevState => {
      return { newComments: [comment, ...prevState.newComments] };
    });
  };

  componentDidMount() {
    const {article_id} = this.props
    fetchComments(article_id)
      .then(data => {
        data.length === 0
          ? this.setState({ noComments: true, comments: data })
          : this.setState({ comments: data });
      })
      .catch(err => {
        this.setState({ noComments: true });
      });
  }
}

export default ArticleComments;
