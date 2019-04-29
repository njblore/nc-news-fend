import React from 'react';
import { Link } from '@reach/router';
import { fetchUser } from '../api';

const Header = props => {
  props.currentUser &&
    props.currentUser !== 'Guest' &&
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
        <Link to="/articles">
          <button className="nav-button button">Articles</button>
        </Link>

        <button onClick={props.toggleTopics} className="nav-button button">
          Topics
        </button>
        {props.currentUser ? (
          <>
            {props.currentUser !== 'Guest' && (
              <Link to={`/users/${props.currentUser}`}>
                <button className="nav-button button">My Profile</button>
              </Link>
            )}
            <button
              onClick={props.toggleLoggedIn}
              className="nav-button button"
            >
              Log Out
            </button>
          </>
        ) : (
          <button onClick={props.toggleShowLogin} className="nav-button button">
            Log In
          </button>
        )}
      </nav>
    </div>
  );
};

export default Header;
