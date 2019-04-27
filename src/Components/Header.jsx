import React from 'react';
import { navigate } from '@reach/router';
import { fetchUser } from '../api';

const Header = props => {
  props.currentUser &&
    fetchUser(props.currentUser).then(data =>
      props.setCurrentAvatar(data.avatar_url),
    );
  return (
    <div className="site-header">
      <div className="title-bar">
        <h1 className="header-title"> &lt; Northcoders News /&gt;</h1>
        {props.currentUser && (
          <div className="current-user">
            <img
              src={props.currentAvatar}
              alt="user avatar"
              className="avatar-img"
            />
            <p className="user-message">{props.currentUser}</p>
          </div>
        )}
      </div>
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
