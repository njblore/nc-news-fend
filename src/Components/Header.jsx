import React from 'react';
import { Link } from '@reach/router';

const Header = props => {
  return (
    <div className="site-header">
      <h1>Northcoders News</h1>
      <nav>
        <button onClick={props.clearTopic}>
          <Link to="/articles" className="link">
            Articles
          </Link>
        </button>
        <button onClick={props.toggleTopics}>Topics</button>
        {props.currentUser ? (
          <>
            <button>
              <Link to={`/users/${props.currentUser}`} className="link">
                My Profile
              </Link>
            </button>
            <button onClick={props.toggleLoggedIn}>Log Out</button>
            <p>Logged in as: {props.currentUser}</p>
          </>
        ) : (
          <button onClick={props.toggleShowLogin}>Log In</button>
        )}
      </nav>
    </div>
  );
};

export default Header;
