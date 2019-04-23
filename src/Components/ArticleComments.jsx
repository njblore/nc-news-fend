import React, { Component } from 'react';
import CommentCard from './CommentCard';
import { fetchComments } from '../api';

class ArticleComments extends Component {
  state = { comments: null };
  render() {
    return (
      <div>
        <h3>Comments:</h3>
        {this.state.comments &&
          this.state.comments.map(comment => {
            return <CommentCard comment={comment} key={comment.comment_id} />;
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
