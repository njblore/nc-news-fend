import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import Axios from 'axios';

class Articles extends Component {
  state = { articles: null, topics: null };
  render() {
    return (
      <div>
        {this.state.articles && (
          <div>
            <h1>All articles</h1>
            {this.state.articles.map(article => {
              return <ArticleCard article={article} />;
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
