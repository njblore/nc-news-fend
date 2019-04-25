import React, { Component } from 'react';
import { fetchTopics, postArticle, postTopic } from '../api';
import { navigate } from '@reach/router';

class PostArticle extends Component {
  state = {
    topics: null,
    title: '',
    body: '',
    topic: '',
    currentlyChecked: null,
    postError: false,
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
              <input
                type="text"
                name="other"
                onChange={this.handleOtherTopic}
              />
            )}
            {this.state.topicError && <p>Topic Already Exists!</p>}
          </div>
          Body:
          <input
            onChange={e => this.handleTyping(e.target.value, 'body')}
            value={this.state.body}
          />
          {this.state.postError && <p>Please fill out all fields!</p>}
          <button>Post Article</button>
        </form>
      </div>
    );
  }

  handleTyping = (value, input) => {
    this.setState(() => {
      return input === 'title'
        ? { title: value, topicError: false }
        : { body: value, topicError: false };
    });
  };

  handleRadioClick = e => {
    this.setState({ currentlyChecked: e.target.value, topicError: false });
  };

  handleOtherTopic = e => {
    this.setState({ topic: e.target.value, topicError: false });
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

    this.state.currentlyChecked === 'other'
      ? postTopic(this.state.topic)
          .then(res => {
            postArticle(articleObject)
              .then(response => {
                navigate(`/articles/${response.data.article.article_id}`);
              })
              .catch(err => {
                this.setState({ postError: true });
              });
          })
          .catch(err => {
            this.setState({ topicError: true });
          })
      : postArticle(articleObject)
          .then(response => {
            navigate(`/articles/${response.data.article.article_id}`);
          })
          .catch(err => {
            this.setState({ postError: true });
          });
  };

  componentDidMount() {
    fetchTopics().then(data => {
      this.setState({ topics: data });
    });
  }
}

export default PostArticle;
