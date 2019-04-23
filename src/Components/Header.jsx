import React from 'react';
import { Link } from '@reach/router';

const Header = props => {
  return (
    <div className="site-header">
      <h1>Northcoders News</h1>
      <nav>
        <button onClick={props.clearTopic}>
          <Link to="/" className="link">
            Articles
          </Link>
        </button>
        <button onClick={props.toggleTopics}>Topics</button>
        {props.currentUser ? (
          <button onClick={props.toggleLoggedIn}>Log Out</button>
        ) : (
          <button onClick={props.toggleShowLogin}>Log In</button>
        )}
      </nav>
    </div>
  );
};

export default Header;
