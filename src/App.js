import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './Components/Header';
import Login from './Components/Login';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle';
import Topics from './Components/Topics';

class App extends Component {
  state = {
    currentUser: null,
    showTopics: false,
    showLogin: false,
    currentTopic: null,
  };

  toggleTopics = () => {
    if (this.state.currentTopic) {
      this.clearTopic();
    }
    this.setState({ showTopics: !this.state.showTopics });
  };

  clearTopic = () => {
    this.setState({ currentTopic: null });
  };

  setTopic = topic => {
    this.setState({ currentTopic: topic });
  };

  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  render() {
    return (
      <div className="App">
        <Header
          toggleTopics={this.toggleTopics}
          clearTopic={this.clearTopic}
          toggleLogin={this.toggleLogin}
        />
        {this.state.showTopics && <Topics setTopic={this.setTopic} />}
        {this.state.showLogin && <Login toggleLogin={this.toggleLogin} />}
        <Router>
          <Articles default currentTopic={this.state.currentTopic} />
          <SingleArticle path="/:article_id" />
          <Login path="/login" />
        </Router>
      </div>
    );
  }
}

export default App;
