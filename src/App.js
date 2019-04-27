import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './Components/Header';
import Login from './Components/Login';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle';
import Topics from './Components/Topics';
import User from './Components/User';
import Error from './Components/Error';
import { navigate } from '@reach/router/';

class App extends Component {
  state = {
    currentUser: null,
    showTopics: false,
    showLogin: false,
    currentTopic: null,
    deleteWarning: false,
    currentAvatar: null,
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
          setCurrentAvatar={this.setCurrentAvatar}
          currentAvatar={this.state.currentAvatar}
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
            path="/articles"
            currentTopic={this.state.currentTopic}
            currentUser={this.state.currentUser}
          />
          <SingleArticle
            path="/articles/:article_id"
            currentUser={this.state.currentUser}
          />
          <User
            path="/users/:username"
            currentUser={this.state.currentUser}
            currentTopic={this.state.currentTopic}
          />
          <Error path="error" default />
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
    this.setState(prevState => {
      return { showLogin: !prevState.showLogin };
    });
  };

  toggleLoggedIn = () => {
    if (this.state.currentUser) {
      this.setState({ currentUser: null }, () => {
        localStorage.removeItem('currentUser');
        navigate('/articles', { state: { loggedOut: true } });
      });
    }
  };

  setCurrentUser = user => {
    this.setState({ currentUser: user });
  };

  setCurrentAvatar = avatar => {
    this.setState({ currentAvatar: avatar });
  };

  componentDidMount() {
    const user = localStorage.getItem('currentUser');
    user && this.setCurrentUser(user);
  }
}

export default App;
