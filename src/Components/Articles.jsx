import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import { Link } from '@reach/router';
import Axios from 'axios';

class Articles extends Component {
  state = { articles: null, topic: null };
  render() {
    return (
      <div className="articles-list">
        {this.state.articles && (
          <div>
            {this.state.articles.map(article => {
              return (
                <Link to={article.article_id.toString()}>
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
    Axios.get(
      'https://northcoders-news-server.herokuapp.com/api/articles',
    ).then(data => this.setState({ articles: data.data.articles }));
  }
}

export default Articles;
