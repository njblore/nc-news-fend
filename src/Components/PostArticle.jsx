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
    topicError: false
  };
  render() {
    const {topics, title, body, currentlyChecked, postError, topicError} = this.state
    const {handlePostArticleClick} = this.props
    return (
      <div className="post-article popup">
        <form className="article-form" onSubmit={this.handleSubmit}>
          Title:
          <input
            onChange={e => this.handleTyping(e.target.value, 'title')}
            value={title}
          />
          Topic:
          {topics &&
            topics.map(topic => {
              return (
                <div className="checkbox" key={topic.slug}>
                  <label htmlFor={topic.slug}>{topic.slug}:</label>
                  <input
                    type="radio"
                    value={topic.slug}
                    name={topic.slug}
                    onChange={this.handleRadioClick}
                    checked={currentlyChecked === topic.slug}
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
              checked={currentlyChecked === 'other'}
            />
            {currentlyChecked === 'other' && (
              <input
                type="text"
                name="other"
                onChange={this.handleOtherTopic}
              />
            )}
            {topicError && <p>Topic Already Exists!</p>}
          </div>
          Body:
          <input
            onChange={e => this.handleTyping(e.target.value, 'body')}
            value={body}
          />
          {postError && <p>Please fill out all fields!</p>}
          <div className="page-buttons">
            <button className="good-button">Post Article</button>
            <button
              onClick={handlePostArticleClick}
              className="bad-button"
            >
              Cancel
            </button>
          </div>
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
    const {currentlyChecked, body, title, topic} = this.state
    const {currentUser} = this.props
    e.preventDefault();
    const currentTopic =
      currentlyChecked === 'other'
        ? topic
        : currentlyChecked;
    const articleObject = {
      body: body,
      author: currentUser,
      title: title,
      topic: currentTopic,
    };

    currentlyChecked === 'other'
      ? postTopic(topic)
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
