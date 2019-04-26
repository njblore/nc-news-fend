import React, { Component } from 'react';
import { fetchUser, postNewUser } from '../api';
import { navigate } from '@reach/router';

class Login extends Component {
  state = {
    username: '',
    invalidUser: false,
    showSignup: false,
    name: '',
    avatar: '',
  };
  render() {
    return (
      <div className="login-box popup">
        <button onClick={this.props.toggleShowLogin} className="bad-button">
          Close
        </button>
        <form onSubmit={this.handleSubmit} className="flex">
          <input
            onChange={e => this.handleTyping(e.target.value, 'username')}
          />
          {this.state.invalidUser && <p>Invalid Username!</p>}
          <button>Log In</button>
        </form>
        <button onClick={this.handleSignup}>Sign Up!</button>
        {this.state.showSignup && (
          <div className="signup-popup popup">
            <button onClick={this.handleSignup} className="bad-button">
              Cancel
            </button>
            Username:
            <input
              onChange={e => this.handleTyping(e.target.value, 'username')}
              value={this.state.username}
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
    e && e.preventDefault();
    fetchUser(this.state.username)
      .then(data => {
        data.username && this.props.setCurrentUser(this.state.username);
        localStorage.setItem('currentUser', data.username);
        this.props.toggleShowLogin();
        navigate(`/users/${data.username}`, { state: { fromLogin: true } });
      })
      .catch(err => this.setState({ invalidUser: true }));
  };

  handleGuest = () => {
    this.props.setCurrentUser('Guest');
    this.props.toggleShowLogin();
    navigate(`/articles`);
  };

  handleSignup = () => {
    this.setState(prevState => {
      return { showSignup: !prevState.showSignup };
    });
  };

  submitSignup = () => {
    const userObj = {
      name: this.state.name,
      username: this.state.username,
      avatar_url: this.state.avatar,
    };
    postNewUser(userObj)
      .then(() => {
        this.props.toggleShowLogin();
        this.handleSignup();
        this.handleSubmit();
      })
      .catch(err => console.log(err.response));
  };
}

export default Login;
