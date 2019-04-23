import React, { Component } from 'react';
import ArticleComments from './ArticleComments';

class SingleArticle extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Title</h1>
        <p>Body</p>
        <ArticleComments />
      </div>
    );
  }
}

export default SingleArticle;
