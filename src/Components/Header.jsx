import React, { Component } from 'react';
import { Link } from '@reach/router';
import { fetchUser } from '../api';

class Header extends Component {
  render() {
    const {
      currentUser,
      currentAvatar,
      toggleTopics,
      toggleLoggedIn,
      toggleShowLogin,
      hideTopics,
    } = this.props;
    return (
      <div className="site-header">
        <div className="title-bar">
          <h1 className="header-title"> &lt; Northcoders News /&gt;</h1>
          {currentUser && (
            <div className="current-user">
              <img
                src={currentAvatar}
                alt="user avatar"
                className="avatar-img"
              />
              <p className="user-message">{currentUser}</p>
            </div>
          )}
        </div>
        <nav>
          <Link to="/articles">
            <button className="nav-button button" onClick={hideTopics}>
              Articles
            </button>
          </Link>

          <button onClick={toggleTopics} className="nav-button button">
            Topics
          </button>
          {currentUser ? (
            <>
              {currentUser !== 'Guest' && (
                <Link to={`/users/${currentUser}`}>
                  <button className="nav-button button" onClick={hideTopics}>
                    My Profile
                  </button>
                </Link>
              )}
              <button
                onClick={() => {
                  toggleLoggedIn();
                  hideTopics();
                }}
                className="nav-button button"
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                toggleShowLogin();
                hideTopics();
              }}
              className="nav-button button"
            >
              Log In
            </button>
          )}
        </nav>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentUser, setCurrentAvatar } = this.props;
    if (prevProps.currentUser !== currentUser) {
      currentUser &&
        currentUser !== 'Guest' &&
        fetchUser(currentUser).then(data => {
          setCurrentAvatar(data.avatar_url);
        });
    }
  }
}

export default Header;
