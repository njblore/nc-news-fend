import React, { Component } from 'react';

class Login extends Component {
  state = {
    visible: false,
    username: '',
    password: '',
  };
  render() {
    return (
      <div>
        <form>
          <input />
          <input />
          <button>Log In</button>
        </form>
        <p>Sign Up</p>
      </div>
    );
  }
}

export default Login;
