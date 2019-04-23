import React, { Component } from 'react';
import Axios from 'axios';

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
    Axios.get('https://northcoders-news-server.herokuapp.com/api/topics').then(
      ({ data }) => this.setState({ topics: data.topics }),
    );
  }
}

export default Topics;
