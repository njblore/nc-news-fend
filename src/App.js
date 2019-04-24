import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './Components/Header';
import Login from './Components/Login';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle';
import Topics from './Components/Topics';
import User from './Components/User';
import { navigate } from '@reach/router/lib/history';

class App extends Component {
  state = {
    currentUser: null,
    showTopics: false,
    showLogin: false,
    currentTopic: null,
  };

  render() {
    return (
      <div className="App">
        <Header
          toggleTopics={this.toggleTopics}
          clearTopic={this.clearTopic}
          toggleShowLogin={this.toggleShowLogin}
          toggleLoggedIn={this.toggleLoggedIn}
          currentUser={this.state.currentUser}
        />
        {this.state.showTopics && <Topics setTopic={this.setTopic} />}
        {this.state.showLogin && (
          <Login
            toggleShowLogin={this.toggleShowLogin}
            setCurrentUser={this.setCurrentUser}
          />
        )}
        <Router>
          <Articles
            default
            currentTopic={this.state.currentTopic}
            currentUser={this.state.currentUser}
          />
          <SingleArticle
            path="/:article_id"
            currentUser={this.state.currentUser}
          />
          <User path="/users/:username" currentUser={this.state.currentUser} />
        </Router>
      </div>
    );
  }

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

  toggleShowLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  toggleLoggedIn = () => {
    if (this.state.currentUser) {
      this.setState({ currentUser: null });
      localStorage.removeItem('currentUser');
      navigate('/', { state: { loggedOut: true } });
    }
  };

  setCurrentUser = user => {
    this.setState({ currentUser: user });
  };

  componentDidMount() {
    const user = localStorage.getItem('currentUser');
    user && this.setCurrentUser(user);
  }
}

export default App;
