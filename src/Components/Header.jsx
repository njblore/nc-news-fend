import React from 'react';
import { Link } from '@reach/router';

const Header = props => {
  return (
    <div className="site-header">
      <h1>Northcoders News</h1>
      <p>Logged in as: {props.currentUser}</p>
      <nav>
        <button onClick={props.clearTopic} className="nav-button">
          <Link to="/articles" className="link">
            Articles
          </Link>
        </button>
        <button onClick={props.toggleTopics} className="nav-button">
          Topics
        </button>
        {props.currentUser ? (
          <>
            <button className="nav-button">
              <Link to={`/users/${props.currentUser}`} className="link">
                My Profile
              </Link>
            </button>
            <button onClick={props.toggleLoggedIn} className="nav-button">
              Log Out
            </button>
          </>
        ) : (
          <button onClick={props.toggleShowLogin} className="nav-button">
            Log In
          </button>
        )}
      </nav>
    </div>
  );
};

export default Header;
