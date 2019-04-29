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
  };
  render() {
    return (
      <div className="comments-section">
        {this.state.noComments ? (
          <p>Be the first to comment!</p>
        ) : (
          <h3>Comments:</h3>
        )}
        {this.props.currentUser && this.props.currentUser !== 'Guest' && (
          <button onClick={this.toggleShowPostComment}>Post A Comment</button>
        )}

        {this.state.showPostComment && (
          <PostComment
            article_id={this.props.article_id}
            currentUser={this.props.currentUser}
            updateComments={this.updateComments}
            toggleShowPostComment={this.toggleShowPostComment}
          />
        )}
        {this.state.comments &&
          [...this.state.newComments, ...this.state.comments].map(comment => {
            return (
              <div key={comment.comment_id} className="article-link">
                <CommentCard
                  comment={comment}
                  currentUser={this.props.currentUser}
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

  updateComments = comment => {
    this.setState(prevState => {
      return { newComments: [comment, ...prevState.newComments] };
    });
  };

  componentDidMount() {
    fetchComments(this.props.article_id)
      .then(data => {
        data.length === 0
          ? this.setState({ noComments: true })
          : this.setState({ comments: data });
      })
      .catch(err => {
        this.setState({ noComments: true });
      });
  }
}

export default ArticleComments;
