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
    const {endOfArticles, articles, showSortBy, showPostArticle, deleteWarning, page} = this.state
    const {currentTopic, currentUser, username} = this.props
    
    return (
      <div className="articles-list">
        {!currentTopic ? (
          !username && (
            <h1 className="header-title">Latest Articles</h1>
          )
        ) : (
          <h1>{currentTopic}</h1>
        )}
        {deleteWarning && (
          <DeleteWarning
            handleDelete={this.handleDelete}
            confirmDeleteArticle={this.confirmDeleteArticle}
          />
        )}

        {articles && (
          <div className="articles-list">
            <div className="options-buttons">
              {!username && (
                <button onClick={this.toggleSortBy}>Sort By:</button>
              )}
              <div className="page-buttons">
                <button
                  onClick={() => this.handlePageChange(-1)}
                  disabled={page === 0}
                >
                  Previous
                </button>
                <button
                  onClick={() => this.handlePageChange(1)}
                  disabled={endOfArticles}
                >
                  Next
                </button>
              </div>
              {currentUser && currentUser !== 'Guest' && (
                <button onClick={this.handlePostArticleClick}>
                  Post An Article
                </button>
              )}
            </div>
            {showSortBy && (
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
            {currentUser && showPostArticle && (
              <PostArticle
                currentUser={currentUser}
                handlePostArticleClick={this.handlePostArticleClick}
              />
            )}
            {articles.map(article => {
              return (
                <div className="article-preview" key={article.article_id}>
                  <ArticleCard
                    article={article}
                    currentUser={currentUser}
                  />

                  {currentUser &&
                    currentUser === article.author && (
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
                disabled={page === 0}
              >
                Previous
              </button>
              <button
                onClick={() => this.handlePageChange(1)}
                disabled={endOfArticles}
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
    const {sortBy, sortOrder} = this.state
    const {currentTopic} = this.props
    this.setState({ sortBy: param, page: 0 }, () => {
      fetchArticles({
        sort_by: sortBy,
        topic: currentTopic,
        order: sortOrder,
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
    const {page, sortBy, sortOrder, totalCount} = this.state
    const {currentTopic, username} = this.props
    if (direction === -1) {
      this.setState({ endOfArticles: false });
    }
    page + direction >= 0 &&
      this.setState(
        prevState => {
          return { page: prevState.page + direction };
        },
        () => {
          fetchArticles({
            p: page * 10,
            sort_by: sortBy,
            topic: currentTopic,
            author: username,
            order: sortOrder,
          })
            .then(data => {
              if (
                (page + 1) * 10 >=
                Math.ceil((totalCount + 1) / 10) * 10
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
    const {articles, articleToDelete} = this.state
    const filteredArticles = articles.filter(
      article => article.article_id !== articleToDelete,
    );
    deleteArticle(articleToDelete)
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
    const {page} = this.state
    if (this.props.articles) {
      const end = this.props.articles.length <= this.props.totalCount;
      this.setState({
        articles: this.props.articles,
        totalCount: this.props.totalCount,
        endOfArticles: end,
      });
    } else {
      fetchArticles({ p: page }).then(data =>
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
    const {currentTopic} = this.props
    if (currentTopic !== prevProps.currentTopic) {
      fetchArticles({
        topic: currentTopic,
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
