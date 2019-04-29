import React, { Component } from 'react';
import { fetchTopics } from '../api';

class Topics extends Component {
  state = { topics: null };
  render() {
    return (
      <div className="topics-bar">
        {this.state.topics && (
          <>
            {this.state.topics.map(topic => {
              return (
                <button
                  key={topic.slug}
                  onClick={e => this.props.setTopic(topic.slug)}
                  className="button topic-button"
                >
                  {topic.slug}
                </button>
              );
            })}
          </>
        )}
      </div>
    );
  }

  componentDidMount() {
    fetchTopics().then(data => this.setState({ topics: data }));
  }
}

export default Topics;
