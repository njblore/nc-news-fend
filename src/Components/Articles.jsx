import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import { fetchArticles, deleteArticle } from '../api';
import DeleteButton from './DeleteButton';
import PostArticle from './PostArticle';
import DeleteWarning from './DeleteWarning';
import { navigate } from '@reach/router/lib/history';

class Articles extends Component {
  state = {
    articles: null,
    showSortBy: false,
    showPostArticle: false,
    deleteWarning: false,
    articleToDelete: null,
    page: 1,
    endOfArticles: false,
  };
  render() {
    return (
      <div className="articles-list">
        {!this.props.currentTopic ? (
          <h1>Latest Articles</h1>
        ) : (
          <h1>{this.props.currentTopic}</h1>
        )}
        {this.state.deleteWarning && (
          <DeleteWarning
            handleDelete={this.handleDelete}
            confirmDeleteArticle={this.confirmDeleteArticle}
          />
        )}

        {this.state.articles && (
          <div>
            <div className="options-buttons">
              <button onClick={this.toggleSortBy}>Sort By:</button>
              <div className="page-buttons">
                <button onClick={() => this.handlePageChange(-1)}>
                  Previous
                </button>
                <button
                  onClick={() => this.handlePageChange(1)}
                  disabled={this.state.endOfArticles}
                >
                  Next
                </button>
              </div>
              {this.props.currentUser && (
                <button onClick={this.handlePostArticleClick}>
                  Post An Article
                </button>
              )}
            </div>
            {this.state.showSortBy && (
              <div className="sort-buttons">
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
              </div>
            )}
            {this.props.currentUser && this.state.showPostArticle && (
              <PostArticle
                currentUser={this.props.currentUser}
                handlePostArticleClick={this.handlePostArticleClick}
              />
            )}
            {this.state.articles.map(article => {
              return (
                <div className="article-preview" key={article.article_id}>
                  {/* {this.props.currentUser && <VoteButtons />} */}

                  <ArticleCard article={article} />

                  {this.props.currentUser &&
                    this.props.currentUser === article.author && (
                      <DeleteButton
                        handleDelete={this.handleDelete}
                        article_id={article.article_id}
                      />
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
      data => this.setState({ articles: data.articles }),
    );
  };

  handlePostArticleClick = () => {
    this.setState(prevState => {
      return { showPostArticle: !prevState.showPostArticle };
    });
  };

  handlePageChange = direction => {
    this.state.page + direction >= 0 &&
      this.setState(
        prevState => {
          return { page: prevState.page + direction };
        },
        () => {
          fetchArticles({ p: this.state.page * 10 }).then(data => {
            if (
              (this.state.page + 1) * 10 >=
              Math.ceil((data.total_count + 1) / 10) * 10
            ) {
              this.setState({ endOfArticles: true });
            }
            this.setState({ articles: data.articles });
          });
        },
      );
  };

  handleDelete = article_id => {
    this.setState(prevState => {
      return {
        deleteWarning: !prevState.deleteWarning,
        articleToDelete: article_id || null,
      };
    });
  };

  confirmDeleteArticle = () => {
    const filteredArticles = this.state.articles.filter(
      article => article.article_id !== this.state.articleToDelete,
    );
    deleteArticle(this.state.articleToDelete)
      .then(() => {
        this.setState({ articles: filteredArticles, deleteWarning: false });
      })
      .catch(err => {
        navigate('/error');
      });
  };

  componentDidMount() {
    fetchArticles({ p: this.state.page }).then(data =>
      this.setState({ articles: data.articles }),
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentTopic !== prevProps.currentTopic) {
      fetchArticles({ topic: this.props.currentTopic }).then(data =>
        this.setState({ articles: data.articles }),
      );
    }
  }
}

export default Articles;
