import React, { Component } from 'react';
import {
  fetchUser,
  fetchArticles,
  deleteArticle,
  editUserProfile,
} from '../api';
import Articles from './Articles';
import { navigate } from '@reach/router/';
import DeleteWarning from './DeleteWarning';

class User extends Component {
  state = {
    user: null,
    articles: null,
    deleteWarning: false,
    articleToDelete: null,
    showEditProfile: false,
    newName: '',
    newAvatar: '',
    totalCount: null,
  };
  render() {
    const {user, articles, deleteWarning, showEditProfile, newName, newAvatar, totalCount} = this.state
    const {location, currentUser} = this.props
    
    return (
      <div className="user-page-container">
        {deleteWarning && (
          <DeleteWarning
            confirmDeleteArticle={this.confirmDeleteArticle}
            handleDelete={this.handleDelete}
          />
        )}
        {user && (
          <>
            {(location.state &&
              location.state.fromLogin) ||
            currentUser === user.username ? (
              <>
                {showEditProfile && (
                  <div className="profile-popup popup">
                    <label className="profile-label flex">
                      Change My Name:
                      <input
                        value={newName}
                        name='newName'
                        onChange={
                          this.handleTyping
                        }
                      />
                    </label>
                    <label className="profile-label flex">
                      Change My Profile Pic:{' '}
                      <input
                        value={newAvatar}
                        name='newAvatar'
                        onChange={
                          this.handleTyping
                        }
                      />
                    </label>
                    <div className="flex">
                      <button
                        onClick={this.handleSubmit}
                        className="good-button"
                      >
                        Done
                      </button>
                      <button
                        onClick={this.toggleShowEdit}
                        className="bad-button"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                <h2 className="user-heading">
                  Welcome Back {user.name}!
                </h2>
                <img
                  src={user.avatar_url}
                  className="profile-pic"
                  alt="user avatar"
                />
                <button onClick={this.toggleShowEdit}>Edit My Profile</button>
                <h3 className="user-heading"> My Articles: </h3>
              </>
            ) : (
              <>
                <h2 className="user-heading">{user.name}</h2>
                <img
                  src={user.avatar_url}
                  alt="user avatar"
                  className="profile-pic"
                />
                <h3 className="user-heading">
                  Articles By {user.name}:
                </h3>
              </>
            )}
            {articles && (
              <Articles
                username={user.username}
                articles={articles}
                totalCount={totalCount}
                currentUser={currentUser}
              />
            )}
          </>
        )}
      </div>
    );
  }

  handleDelete = article_id => {
    this.setState(prevState => {
      return {
        deleteWarning: !prevState.deleteWarning,
        articleToDelete: article_id || null,
      };
    });
  };

  confirmDeleteArticle = () => {
    const {articles, articleToDelete} = this.state
    const filteredArticles = articles.filter(
      article => article.article_id !== articleToDelete,
    );
    deleteArticle(articleToDelete)
      .then(() => {
        this.setState({ articles: filteredArticles, deleteWarning: false });
      })
      .catch(err => {
        navigate('/error');
      });
  };

  toggleShowEdit = () => {
    this.setState(prevState => {
      return {
        showEditProfile: !prevState.showEditProfile,
        newName: '',
        newAvatar: '',
      };
    });
  };

  handleTyping = (e) => {
    this.setState({[e.target.name]: e.target.value})

  };

  handleSubmit = () => {
    const {newAvatar, newName, user} = this.state
    let newUser = {};
    if (newAvatar) {
      newUser.avatar_url = newAvatar;
    }
    if (newName) {
      newUser.name = newName;
    }
    editUserProfile(newUser, user.username).then(data => {
      this.toggleShowEdit();
      this.setState({ user: data.user });
    });
  };

  componentDidMount() {
    const {username} = this.props
    fetchUser(username)
      .then(data => {
        this.setState({ user: data }, () => {
          fetchArticles({ author: username }).then(data =>
            this.setState({
              articles: data.articles,
              totalCount: data.total_count,
            }),
          );
        });
      })
      .catch(err => {
        const msg = err.response.data.msg;
        navigate('/Error', { replace: true, state: { msg } });
      });
    // fetchArticles({ author: username }).then(data =>
    //   this.setState({ articles: data.articles, totalCount: data.total_count }),
    // );
  }

  componentDidUpdate(prevProps, prevState) {
    const {currentTopic, username} = this.props
    if (currentTopic !== prevProps.currentTopic) {
      fetchArticles({
        author: username,
        topic: currentTopic,
      }).then(data => this.setState({ articles: data.articles }));
    }
  }
}

export default User;
