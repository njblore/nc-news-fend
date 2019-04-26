import React from 'react';
import { Link } from '@reach/router';

const Header = props => {
  console.log(props);
  return (
    <div className="site-header">
      <h1>Northcoders News</h1>
      {props.currentUser && <p>Logged in as: {props.currentUser}</p>}
      <nav>
        <Link to="/articles" className="link">
          <button onClick={props.clearTopic} className="nav-button">
            Articles
          </button>
        </Link>
        <button onClick={props.toggleTopics} className="nav-button">
          Topics
        </button>
        {props.currentUser ? (
          <>
            {props.currentUser !== 'Guest' && (
              <Link to={`/users/${props.currentUser}`} className="link">
                <button className="nav-button">My Profile</button>
              </Link>
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
