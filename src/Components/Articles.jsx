import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import { Link } from '@reach/router';
import { fetchArticles } from '../api';
import VoteButtons from './VoteButtons';

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
                <div className="article-link" key={article.article_id}>
                  {this.props.currentUser && <VoteButtons />}
                  <Link to={article.article_id.toString()} className="link">
                    <ArticleCard article={article} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

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
