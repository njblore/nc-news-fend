import React, { Component } from 'react';
import { fetchUser } from '../api';

class User extends Component {
  state = { user: null };
  render() {
    return <div>{this.state.user && <h2>{this.state.user.name}</h2>}</div>;
  }

  componentDidMount() {
    fetchUser(this.props.username).then(data => {
      this.setState({ user: data });
    });
  }
}

export default User;
