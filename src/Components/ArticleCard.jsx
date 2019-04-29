import React, { Component } from 'react';
import { Link } from '@reach/router';
import VoteButtons from './VoteButtons';
import { updateArticleVotes } from '../api';

class ArticleCard extends Component {
  state = { currentArticleVotes: 0, votingError: false };
  render() {
    const {currentArticleVotes} = this.state
    const {currentUser, article} = this.props
    return (
      <div className="article-sub-preview">
        {currentUser ? (
          <div className="article-votes">
            <VoteButtons
              article_id={article.article_id}
              handleArticleVote={this.handleArticleVote}
              votes={article.votes}
              votesToAdd={currentArticleVotes}
            />
          </div>
        ) : (
          <p className="guest-votes">{article.votes}</p>
        )}

        <div className="article-card">
          <header className="article-preview-header">
            <Link
              to={`/articles/${article.article_id.toString()}`}
              className="link"
            >
              <h2 className="article-title">
                {article.title
                  .split(' ')
                  .slice(0, 7)
                  .join(' ') + '...'}
              </h2>
            </Link>
            <div className="article-header-subtitle">
              <Link to={`/users/${article.author}`} className="link">
                <h3 className=" article-author">
                  - {article.author}
                </h3>
              </Link>
              <h3>{article.created_at.slice(0, 10)}</h3>
              <h3 className="">[{article.topic}] </h3>
              <h3>
                {article.comment_count === '1'
                  ? article.comment_count + ' comment'
                  : article.comment_count + ' comments'}
              </h3>
            </div>
          </header>
          <p className="preview-body">
            {article.body
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
