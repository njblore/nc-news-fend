import React, { Component } from 'react';
import { fetchUser, postNewUser } from '../api';
import { navigate } from '@reach/router';

class Login extends Component {
  state = {
    username: '',
    invalidUser: false,
    showSignup: false,
    fullName: '',
    avatar: '',
  };
  render() {
    const {username, invalidUser, showSignup} = this.state
    const {toggleShowLogin} = this.props
    return (
      <div className="login-box popup">
        <button onClick={toggleShowLogin} className="bad-button">
          Close
        </button>
        <form onSubmit={this.handleSubmit} className="flex">
          <input
            onChange={e => this.handleTyping(e.target.value, 'username')}
          />
          {invalidUser && <p>Invalid Username!</p>}
          <button>Log In</button>
        </form>
        <button onClick={this.handleSignup}>Sign Up!</button>
        {showSignup && (
          <div className="signup-popup popup">
            <button onClick={this.handleSignup} className="bad-button">
              Cancel
            </button>
            Username:
            <input
              onChange={e => this.handleTyping(e.target.value, 'username')}
              value={username}
            />
            Name:
            <input onChange={e => this.handleTyping(e.target.value, 'name')} />
            Avatar:
            <input
              onChange={e => this.handleTyping(e.target.value, 'avatar')}
            />
            <button onClick={this.submitSignup} className="good-button">
              Sign Me Up!
            </button>
          </div>
        )}
        <button onClick={this.handleGuest}>Log In As Guest</button>
      </div>
    );
  }

  handleTyping = (val, name) => {
    if (name === 'username') {
      this.setState({ username: val });
    } else if (name === 'name') {
      this.setState({ name: val });
    } else if (name === 'avatar') {
      this.setState({ avatar: val });
    }
  };

  handleSubmit = e => {
    const {username} = this.state
    const {setCurrentUser, toggleShowLogin} = this.props
    e && e.preventDefault();
    fetchUser(username)
      .then(data => {
        data.username && setCurrentUser(username);
        localStorage.setItem('currentUser', data.username);
        toggleShowLogin();
        navigate(`/users/${data.username}`, { state: { fromLogin: true } });
      })
      .catch(err => this.setState({ invalidUser: true }));
  };

  handleGuest = () => {
    const {setCurrentUser, toggleShowLogin} = this.props
    setCurrentUser('Guest');
    toggleShowLogin();
    navigate(`/articles`);
  };

  handleSignup = () => {
    this.setState(prevState => {
      return { showSignup: !prevState.showSignup };
    });
  };

  submitSignup = () => {
    const {fullName, username, avatar} = this.state
    const {toggleShowLogin} = this.props
    const userObj = {
      name: fullName,
      username: username,
      avatar_url: avatar,
    };
    postNewUser(userObj)
      .then(() => {
        toggleShowLogin();
        this.handleSignup();
        this.handleSubmit();
      })
      .catch(err => console.log(err.response));
  };
}

export default Login;
