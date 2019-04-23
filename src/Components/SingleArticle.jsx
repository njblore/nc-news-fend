import React, { Component } from 'react';
import ArticleComments from './ArticleComments';

class SingleArticle extends Component {
  state = {};
  render() {
    return (
      <div>
        <header>
          <h1>Title</h1>
          <h3>Author</h3>
          <h3>Topic</h3>
          <h3>Votes</h3>
        </header>
        <p>Body</p>
        <ArticleComments />
      </div>
    );
  }

  componentDidMount() {
    console.log(this.props);
  }
}

export default SingleArticle;
