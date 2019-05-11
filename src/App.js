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
import Home from './Components/Home';

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
    const {
      currentAvatar,
      currentTopic,
      showLogin,
      showTopics,
      currentUser,
    } = this.state;
    return (
      <div className="App">
        <Header
          toggleTopics={this.toggleTopics}
          clearTopic={this.clearTopic}
          toggleShowLogin={this.toggleShowLogin}
          toggleLoggedIn={this.toggleLoggedIn}
          currentUser={currentUser}
          setCurrentAvatar={this.setCurrentAvatar}
          currentAvatar={currentAvatar}
          hideTopics={this.hideTopics}
        />
        {showTopics && <Topics setTopic={this.setTopic} />}
        {showLogin && (
          <Login
            toggleShowLogin={this.toggleShowLogin}
            setCurrentUser={this.setCurrentUser}
          />
        )}
        <Router>
          <Home path="/" />
          <Articles
            path="/articles"
            currentTopic={currentTopic}
            currentUser={currentUser}
          />
          <SingleArticle
            path="/articles/:article_id"
            currentUser={currentUser}
          />
          <User
            path="/users/:username"
            currentUser={currentUser}
            currentTopic={currentTopic}
          />
          <Error path="error" default />
        </Router>
      </div>
    );
  }

  toggleTopics = () => {
    const { currentTopic, showTopics } = this.state;
    if (currentTopic) {
      this.clearTopic();
    }
    this.setState({ showTopics: !showTopics });
  };

  clearTopic = () => {
    this.setState({ currentTopic: null });
  };

  hideTopics = () => {
    const { showTopics } = this.state;
    this.setState({ showTopics: false });
  };

  setTopic = topic => {
    this.setState({ currentTopic: topic }, () => {
      navigate('/articles');
    });
  };

  toggleShowLogin = () => {
    this.setState(prevState => {
      return { showLogin: !prevState.showLogin };
    });
  };

  toggleLoggedIn = () => {
    const { currentUser } = this.state;
    if (currentUser) {
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
