import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import { Link } from '@reach/router';
import { fetchArticles } from '../api';
// import VoteButtons from './VoteButtons';
import DeleteButton from './DeleteButton';
import PostArticle from './PostArticle';

class Articles extends Component {
  state = { articles: null, showSortBy: false, showPostArticle: false };
  render() {
    return (
      <div className="articles-list">
        {!this.props.currentTopic ? (
          <h1>Latest Articles</h1>
        ) : (
          <h1>{this.props.currentTopic}</h1>
        )}

        {this.state.articles && (
          <div>
            <button onClick={this.toggleSortBy}>Sort By:</button>
            {this.state.showSortBy && (
              <>
                <button onClick={() => this.fetchSortedArticles('created_at')}>
                  Date
                </button>
                <button
                  onClick={() => this.fetchSortedArticles('comment_count')}
                >
                  Comment Count
                </button>
                <button
                  onClick={() => {
                    this.fetchSortedArticles('votes');
                  }}
                >
                  Votes
                </button>
              </>
            )}
            {this.props.currentUser && (
              <button onClick={this.handlePostArticleClick}>
                Post An Article
              </button>
            )}
            {this.props.currentUser && this.state.showPostArticle && (
              <PostArticle
                currentUser={this.props.currentUser}
                handlePostArticleClick={this.handlePostArticleClick}
              />
            )}
            {this.state.articles.map(article => {
              return (
                <div className="article-link" key={article.article_id}>
                  {/* {this.props.currentUser && <VoteButtons />} */}
                  <Link to={article.article_id.toString()} className="link">
                    <ArticleCard article={article} />
                  </Link>
                  {this.props.currentUser &&
                    this.props.currentUser === article.author && (
                      <DeleteButton />
                    )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  toggleSortBy = () => {
    this.setState(prevState => {
      return { showSortBy: !prevState.showSortBy };
    });
  };

  fetchSortedArticles = param => {
    fetchArticles({ sort_by: param, topic: this.props.currentTopic }).then(
      data => this.setState({ articles: data }),
    );
  };

  handlePostArticleClick = () => {
    this.setState(prevState => {
      return { showPostArticle: !prevState.showPostArticle };
    });
  };

  componentDidMount() {
    fetchArticles({}).then(data => this.setState({ articles: data }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentTopic !== prevProps.currentTopic) {
      fetchArticles({ topic: this.props.currentTopic }).then(data =>
        this.setState({ articles: data }),
      );
    }
  }
}

export default Articles;
