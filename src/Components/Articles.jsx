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
    page: 0,
    sortBy: '',
    endOfArticles: false,
    totalCount: null,
    loggedInUser: null,
    sortOrder: 'asc',
  };
  render() {
    return (
      <div className="articles-list">
        {!this.props.currentTopic ? (
          !this.props.username && (
            <h1 className="header-title">Latest Articles</h1>
          )
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
          <div className="articles-list">
            <div className="options-buttons">
              {!this.props.username && (
                <button onClick={this.toggleSortBy}>Sort By:</button>
              )}
              <div className="page-buttons">
                <button
                  onClick={() => this.handlePageChange(-1)}
                  disabled={this.state.page === 0}
                >
                  Previous
                </button>
                <button
                  onClick={() => this.handlePageChange(1)}
                  disabled={this.state.endOfArticles}
                >
                  Next
                </button>
              </div>
              {this.props.currentUser && this.props.currentUser !== 'Guest' && (
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
                  <ArticleCard
                    article={article}
                    currentUser={this.props.currentUser}
                  />

                  {this.props.currentUser &&
                    this.props.currentUser === article.author && (
                      <div className="article-delete">
                        <DeleteButton
                          handleDelete={this.handleDelete}
                          article_id={article.article_id}
                        />
                      </div>
                    )}
                </div>
              );
            })}
            <div className="flex">
              <button
                onClick={() => this.handlePageChange(-1)}
                disabled={this.state.page === 0}
              >
                Previous
              </button>
              <button
                onClick={() => this.handlePageChange(1)}
                disabled={this.state.endOfArticles}
              >
                Next
              </button>
            </div>
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
    this.setState({ sortBy: param, page: 0 }, () => {
      fetchArticles({
        sort_by: this.state.sortBy,
        topic: this.props.currentTopic,
        order: this.state.sortOrder,
      }).then(data => {
        const sortOrder = { asc: 'desc', desc: 'asc' };
        this.setState(prevState => {
          return {
            articles: data.articles,
            endOfArticles: false,
            sortOrder: sortOrder[prevState.sortOrder],
          };
        });
      });
    });
  };

  handlePostArticleClick = () => {
    this.setState(prevState => {
      return { showPostArticle: !prevState.showPostArticle };
    });
  };

  handlePageChange = direction => {
    if (direction === -1) {
      this.setState({ endOfArticles: false });
    }
    this.state.page + direction >= 0 &&
      this.setState(
        prevState => {
          return { page: prevState.page + direction };
        },
        () => {
          fetchArticles({
            p: this.state.page * 10,
            sort_by: this.state.sort_by,
            topic: this.props.currentTopic,
            author: this.props.username,
            order: this.state.sortOrder,
          })
            .then(data => {
              if (
                (this.state.page + 1) * 10 >=
                Math.ceil((this.state.totalCount + 1) / 10) * 10
              ) {
                this.setState({ endOfArticles: true });
              }
              this.setState({
                articles: data.articles,
                totalCount: data.total_count,
              });
            })
            .catch(err => console.log(err.response));
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
        this.setState(prevState => {
          return {
            articles: filteredArticles,
            deleteWarning: false,
            totalCount: prevState.totalCount - 1,
            endOfArticles: false,
          };
        });
      })
      .catch(err => {
        navigate('/error');
      });
  };

  componentDidMount() {
    if (this.props.articles) {
      const end = this.props.articles.length <= this.props.totalCount;
      this.setState({
        articles: this.props.articles,
        totalCount: this.props.totalCount,
        endOfArticles: end,
      });
    } else {
      fetchArticles({ p: this.state.page }).then(data =>
        this.setState({
          articles: data.articles,
          totalCount: data.total_count,
          page: 0,
          endOfArticles: false,
        }),
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentTopic !== prevProps.currentTopic) {
      fetchArticles({
        topic: this.props.currentTopic,
      }).then(data => {
        const end = data.total_count <= 10;
        this.setState({
          articles: data.articles,
          totalCount: data.total_count,
          page: 0,
          endOfArticles: end,
        });
      });
    }
  }
}

export default Articles;
