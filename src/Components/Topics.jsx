import React, { Component } from 'react';
import { fetchTopics } from '../api';

class Topics extends Component {
  state = { topics: null };
  render() {
    const {topics} = this.state
    const {setTopic} = this.props
    return (
      <div className="topics-bar">
        {topics && (
          <>
            {topics.map(topic => {
              return (
                <button
                  key={topic.slug}
                  onClick={e => setTopic(topic.slug)}
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
