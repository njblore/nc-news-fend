import React, { Component } from 'react';

class Login extends Component {
  state = {
    username: '',
  };
  render() {
    return (
      <div className="login-box">
        <button onClick={this.props.toggleLogin}>Close</button>
        <form>
          <input onChange={this.handleTyping} />
          <button>Log In</button>
        </form>
        <p>Sign Up</p>
      </div>
    );
  }

  handleTyping = e => {
    this.setState({ username: e.target.value });
  };
}

export default Login;
