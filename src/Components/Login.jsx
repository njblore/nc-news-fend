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
    const { username, invalidUser, showSignup } = this.state;
    const { toggleShowLogin } = this.props;
    return (
      <div className="login-box popup">
        <button onClick={toggleShowLogin} className="bad-button">
          Close
        </button>
        <form onSubmit={this.handleSubmit} className="flex">
          <input name="username" onChange={this.handleTyping} />
          {invalidUser && <p>Invalid Username!</p>}
          <button>Log In</button>
        </form>
        <button onClick={this.handleSignup}>Sign Up!</button>
        {showSignup && (
          <form onSubmit={this.submitSignup} className="signup-popup popup">
            <button onClick={this.handleSignup} className="bad-button">
              Cancel
            </button>
            Username:
            <input
              name="username"
              onChange={this.handleTyping}
              value={username}
            />
            Name:
            <input name="fullName" onChange={this.handleTyping} />
            Avatar:
            <input name="avatar" onChange={this.handleTyping} />
            <button type="submit" className="good-button">
              Sign Me Up!
            </button>
          </form>
        )}
        <button onClick={this.handleGuest}>Log In As Guest</button>
      </div>
    );
  }

  handleTyping = e => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    const { username } = this.state;
    const { setCurrentUser, toggleShowLogin } = this.props;
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
    const { setCurrentUser, toggleShowLogin } = this.props;
    setCurrentUser('Guest');
    toggleShowLogin();
    navigate(`/articles`);
  };

  handleSignup = () => {
    this.setState(prevState => {
      return { showSignup: !prevState.showSignup };
    });
  };

  submitSignup = e => {
    e.preventDefault();
    console.log(this.state);
    const { fullName, username, avatar } = this.state;
    const { toggleShowLogin } = this.props;
    const userObj = {
      name: fullName,
      username: username,
      avatar_url: avatar,
    };
    console.log(userObj);
    postNewUser(userObj)
      .then(() => {
        this.handleSubmit();
        this.handleSignup();
      })
      .catch(err => console.log(err.response));
  };
}

export default Login;
