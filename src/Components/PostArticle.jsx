import React, { Component } from 'react';
import { fetchTopics, postArticle } from '../api';

class PostArticle extends Component {
  state = {
    topics: null,
    title: '',
    body: '',
    topic: '',
    currentlyChecked: null,
  };
  render() {
    return (
      <div className="post-article">
        <button onClick={this.props.handlePostArticleClick}>Cancel</button>
        <form className="article-form" onSubmit={this.handleSubmit}>
          Title:
          <input
            onChange={e => this.handleTyping(e.target.value, 'title')}
            value={this.state.title}
          />
          Topic:
          {this.state.topics &&
            this.state.topics.map(topic => {
              return (
                <div className="checkbox" key={topic.slug}>
                  <label htmlFor={topic.slug}>{topic.slug}:</label>
                  <input
                    type="radio"
                    value={topic.slug}
                    name={topic.slug}
                    onChange={this.handleRadioClick}
                    checked={this.state.currentlyChecked === topic.slug}
                  />
                </div>
              );
            })}
          <div className="checkbox">
            <label htmlFor="other">another one:</label>
            <input
              type="radio"
              value="other"
              name="other"
              onChange={this.handleRadioClick}
              checked={this.state.currentlyChecked === 'other'}
            />
            {this.state.currentlyChecked === 'other' && (
              <input type="text" name="other" />
            )}
          </div>
          Body:
          <input
            onChange={e => this.handleTyping(e.target.value, 'body')}
            value={this.state.body}
          />
          <button>Post Article</button>
        </form>
      </div>
    );
  }

  handleTyping = (value, input) => {
    console.log(value);
    this.setState(() => {
      return input === 'title' ? { title: value } : { body: value };
    });
  };

  handleRadioClick = e => {
    this.setState({ currentlyChecked: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const topic =
      this.state.currentlyChecked === 'other'
        ? this.state.topic
        : this.state.currentlyChecked;
    const articleObject = {
      body: this.state.body,
      author: this.props.currentUser,
      title: this.state.title,
      topic,
    };
    postArticle(articleObject).then(data => console.log(data));
  };

  componentDidMount() {
    fetchTopics().then(data => {
      this.setState({ topics: data });
    });
  }
}

export default PostArticle;
