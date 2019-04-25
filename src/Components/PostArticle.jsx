import React, { Component } from 'react';
import { fetchTopics } from '../api';

class PostArticle extends Component {
  state = { topics: null };
  render() {
    return (
      <div className="post-article">
        <button onClick={this.props.handlePostArticleClick}>Cancel</button>
        <form className="article-form">
          Title:
          <input onChange={this.handleTyping} />
          Topic:
          {this.state.topics &&
            this.state.topics.map(topic => {
              return (
                <div className="checkbox" key={topic.slug}>
                  <label htmlFor={topic.slug}>{topic.slug}:</label>
                  <input type="checkbox" value={topic.slug} name={topic.slug} />
                </div>
              );
            })}
          <div className="checkbox">
            <label htmlFor="other">Other:</label>
            <input type="text" name="other" />
          </div>
          Body:
          <input />
          <button>Post Article</button>
        </form>
      </div>
    );
  }

  handleTyping = e => {
    console.log(e.target);
  };

  componentDidMount() {
    fetchTopics().then(data => {
      this.setState({ topics: data });
    });
  }
}

export default PostArticle;
