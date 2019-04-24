import React, { Component } from 'react';
import CommentCard from './CommentCard';
import { fetchComments } from '../api';
import VoteButtons from './VoteButtons';
import DeleteButton from './DeleteButton';

class ArticleComments extends Component {
  state = { comments: null };
  render() {
    return (
      <div className="comments-section">
        <h3>Comments:</h3>
        {this.state.comments &&
          this.state.comments.map(comment => {
            return (
              <div key={comment.comment_id} className="article-link">
                {this.props.currentUser && <VoteButtons />}
                <CommentCard comment={comment} />
                {this.props.currentUser &&
                  this.props.currentUser === comment.author && <DeleteButton />}
              </div>
            );
          })}
      </div>
    );
  }

  componentDidMount() {
    fetchComments(this.props.article_id).then(data =>
      this.setState({ comments: data }),
    );
  }
}

export default ArticleComments;
