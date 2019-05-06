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
    checked: 'asc',
  };
  render() {
    const {
      endOfArticles,
      showSortBy,
      showPostArticle,
      deleteWarning,
      page,
    } = this.state;
    const { currentTopic, currentUser, username } = this.props;

    return (
      <div className="articles-list">
        {!currentTopic ? (
          !username && <h1 className="header-title">Latest Articles</h1>
        ) : (
          <h1>{currentTopic}</h1>
        )}
        {deleteWarning && (
          <DeleteWarning
            handleDelete={this.handleDelete}
            confirmDeleteArticle={this.confirmDeleteArticle}
          />
        )}

        {this.state.articles && (
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
                <div className="radio-buttons">
                  Asc
                  <input
                    type="radio"
                    value="asc"
                    name="asc"
                    checked={this.state.checked === 'asc'}
                    onChange={this.setSortOrder}
                  />
                  Desc
                  <input
                    type="radio"
                    value="asc"
                    name="desc"
                    checked={this.state.checked === 'desc'}
                    onChange={this.setSortOrder}
                  />
                </div>
                <button
                  className="sort-button"
                  onClick={() => this.fetchSortedArticles('created_at')}
                >
                  Date
                </button>
                <button
                  className="sort-button"
                  onClick={() => this.fetchSortedArticles('comment_count')}
                >
                  Comments
                </button>
                <button
                  className="sort-button"
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
            {this.state.articles.map(article => {
              return (
                <div className="article-preview" key={article.article_id}>
                  <ArticleCard article={article} currentUser={currentUser} />

                  {currentUser && currentUser === article.author && (
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
    const { sortOrder } = this.state;
    const { currentTopic } = this.props;
    this.toggleSortBy();
    fetchArticles({
      sort_by: param,
      topic: currentTopic,
      order: sortOrder,
      page: 0,
    }).then(data =>
      this.setState({ articles: data.articles, page: 0, sortBy: param }),
    );
  };

  handlePostArticleClick = () => {
    this.setState(prevState => {
      return { showPostArticle: !prevState.showPostArticle };
    });
  };

  setSortOrder = e => {
    let order = e.target.name;
    fetchArticles({
      sort_by: this.state.sortBy,
      topic: this.state.currentTopic,
      page: 0,

      order: order,
    }).then(data => {
      this.setState({
        articles: data.articles,
        sortOrder: order,
        checked: order,
      });
    });
  };

  handlePageChange = direction => {
    const { page, sortBy, sortOrder, totalCount } = this.state;
    const { currentTopic } = this.props;
    if (direction === -1) {
      this.setState({ endOfArticles: false });
    }

    page + direction >= 0 &&
      fetchArticles({
        p: (this.state.page + direction) * 10,
        topic: currentTopic,
        order: sortOrder,
        sort_by: sortBy,
      }).then(data => {
        if ((page + 1) * 10 >= Math.ceil((totalCount + 1) / 10) * 10) {
          this.setState({ endOfArticles: true });
        }

        this.setState(prevState => {
          return {
            articles: data.articles,
            totalCount: data.total_count,
            page: prevState.page + direction,
          };
        });
      });
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
    const { articles, articleToDelete } = this.state;
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
    const { page } = this.state;

    if (this.props.articles) {
      const end = this.props.articles.length <= this.props.totalCount;
      this.setState({
        articles: this.props.articles,
        totalCount: this.props.totalCount,
        endOfArticles: end,
      });
    } else {
      fetchArticles({ p: page, topic: this.props.currentTopic }).then(data =>
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
    const { currentTopic } = this.props;
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
