import React, { Component } from 'react';
import { Link } from '@reach/router';
import VoteButtons from './VoteButtons';
import { updateArticleVotes } from '../api';

class ArticleCard extends Component {
  state = { currentArticleVotes: 0, votingError: false };
  render() {
    return (
      <div className="article-sub-preview">
        {this.props.currentUser ? (
          <div className="article-votes">
            <VoteButtons
              article_id={this.props.article.article_id}
              handleArticleVote={this.handleArticleVote}
              votes={this.props.article.votes}
              votesToAdd={this.state.currentArticleVotes}
            />
          </div>
        ) : (
          <p className="guest-votes">{this.props.article.votes}</p>
        )}

        <div className="article-card">
          <header className="article-preview-header">
            <Link
              to={`/articles/${this.props.article.article_id.toString()}`}
              className="link"
            >
              <h2 className="article-title">
                {this.props.article.title
                  .split(' ')
                  .slice(0, 7)
                  .join(' ') + '...'}
              </h2>
            </Link>
            <div className="article-header-subtitle">
              <Link to={`/users/${this.props.article.author}`} className="link">
                <h3 className=" article-author">
                  - {this.props.article.author}
                </h3>
              </Link>
              <h3>{this.props.article.created_at.slice(0, 10)}</h3>
              <h3 className="">[{this.props.article.topic}] </h3>
              <h3>
                {this.props.article.comment_count === '1'
                  ? this.props.article.comment_count + ' comment'
                  : this.props.article.comment_count + ' comments'}
              </h3>
            </div>
          </header>
          <p className="preview-body">
            {this.props.article.body
              .split(' ')
              .slice(0, 10)
              .join(' ') + '...'}
          </p>
        </div>
      </div>
    );
  }

  handleArticleVote = (vote, _, article_id) => {
    updateArticleVotes(article_id, vote)
      .then(() => {
        this.setState(prevState => {
          return {
            currentArticleVotes: prevState.currentArticleVotes + vote,
            votingError: false,
          };
        });
      })
      .catch(() => {
        this.setState({ votingError: true });
      });
  };
}

export default ArticleCard;
