import React, { Component } from 'react';
import ArticleComments from './ArticleComments';
import Axios from 'axios';

class SingleArticle extends Component {
  state = {
    article: null,
  };
  render() {
    return (
      <div>
        {this.state.article && (
          <div>
            <header className="article-header">
              <h1>{this.state.article.title}</h1>
              <h3>{this.state.article.author}</h3>
              <h3>{this.state.article.topic}</h3>
              <h3>{this.state.article.votes}</h3>
            </header>
            <p>{this.state.article.body}</p>
            <ArticleComments article_id={this.props.article_id} />
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    Axios.get(
      `https://northcoders-news-server.herokuapp.com/api/articles/${
        this.props.article_id
      }`,
    ).then(({ data }) => this.setState({ article: data.article }));
  }
}

export default SingleArticle;
