import React, { Component } from 'react';
import { fetchUser } from '../api';
import { navigate } from '@reach/router';

class Login extends Component {
  state = {
    username: '',
    invalidUser: false,
  };
  render() {
    return (
      <div className="login-box">
        <button onClick={this.props.toggleShowLogin}>Close</button>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleTyping} />
          {this.state.invalidUser && <p>Invalid Username!</p>}
          <button>Log In</button>
        </form>
        <p>Sign Up</p>
      </div>
    );
  }

  handleTyping = e => {
    this.setState({ username: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetchUser(this.state.username).then(data => {
      if (data) {
        data.username && this.props.setCurrentUser(this.state.username);
        this.props.toggleShowLogin();
        navigate(`/users/${data.username}`);
      } else {
        this.setState({ invalidUser: true });
      }
    });
  };
}

export default Login;
