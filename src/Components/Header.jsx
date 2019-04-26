import React from 'react';
import { navigate } from '@reach/router';

const Header = props => {
  return (
    <div className="site-header">
      <h1>Northcoders News</h1>
      {props.currentUser && <p>Logged in as: {props.currentUser}</p>}
      <nav>
        <button
          onClick={() => {
            navigate('/articles');
          }}
          className="nav-button"
        >
          Articles
        </button>

        <button onClick={props.toggleTopics} className="nav-button">
          Topics
        </button>
        {props.currentUser ? (
          <>
            {props.currentUser !== 'Guest' && (
              <button
                className="nav-button"
                onClick={() => navigate(`/users/${props.currentUser}`)}
              >
                My Profile
              </button>
            )}
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
