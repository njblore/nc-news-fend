import React, { Component } from 'react';

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav>
        <button>Articles</button>
        <button>Topics</button>
        <button>Log In</button>
      </nav>
    );
  }
}

export default Navbar;
