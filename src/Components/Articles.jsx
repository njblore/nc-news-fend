import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import { Link } from '@reach/router';
import { fetchArticles } from '../api';

class Articles extends Component {
  state = { articles: null };
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
            {this.state.articles.map(article => {
              return (
                <Link
                  to={article.article_id.toString()}
                  className="link"
                  key={article.article_id}
                >
                  <ArticleCard article={article} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    fetchArticles().then(data => this.setState({ articles: data }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentTopic !== prevProps.currentTopic) {
      fetchArticles(this.props.currentTopic).then(data =>
        this.setState({ articles: data }),
      );
    }
  }
}

export default Articles;
