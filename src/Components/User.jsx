import React, { Component } from 'react';
import {
  fetchUser,
  fetchArticles,
  deleteArticle,
  editUserProfile,
} from '../api';
import Articles from './Articles';
import { navigate } from '@reach/router/lib/history';
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
  };
  render() {
    return (
      <div className="user-page-container">
        {this.state.deleteWarning && (
          <DeleteWarning
            confirmDeleteArticle={this.confirmDeleteArticle}
            handleDelete={this.handleDelete}
          />
        )}
        {this.state.user && (
          <>
            {(this.props.location.state &&
              this.props.location.state.fromLogin) ||
            this.props.currentUser === this.state.user.username ? (
              <>
                {this.state.showEditProfile && (
                  <div className="profile-popup popup">
                    <label className="profile-label flex">
                      Change My Name:
                      <input
                        value={this.state.newName}
                        onChange={e => {
                          this.handleTyping(e.target.value, 'name');
                        }}
                      />
                    </label>
                    <label className="profile-label flex">
                      Change My Profile Pic:{' '}
                      <input
                        value={this.state.newAvatar}
                        onChange={e => {
                          this.handleTyping(e.target.value, 'avatar');
                        }}
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
                  Welcome Back {this.state.user.name}!
                </h2>
                <img
                  src={this.state.user.avatar_url}
                  className="profile-pic"
                  alt="user avatar"
                />
                <button onClick={this.toggleShowEdit}>Edit My Profile</button>
                <h3 className="user-heading"> My Articles: </h3>
              </>
            ) : (
              <>
                <h2 className="user-heading">{this.state.user.name}</h2>
                <img
                  src={this.state.user.avatar_url}
                  alt="user avatar"
                  className="profile-pic"
                />
                <h3 className="user-heading">
                  Articles By {this.state.user.name}:
                </h3>
              </>
            )}
            {this.state.articles && (
              <Articles
                username={this.state.user.username}
                articles={this.state.articles}
              />
            )}
          </>
        )}
      </div>
    );
  }

  handleDelete = article_id => {
    console.log('handling delete');
    this.setState(prevState => {
      return {
        deleteWarning: !prevState.deleteWarning,
        articleToDelete: article_id || null,
      };
    });
  };

  confirmDeleteArticle = () => {
    console.log('confirming delete');

    const filteredArticles = this.state.articles.filter(
      article => article.article_id !== this.state.articleToDelete,
    );
    deleteArticle(this.state.articleToDelete)
      .then(() => {
        console.log('deleted delete');

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

  handleTyping = (val, name) => {
    if (name === 'name') {
      this.setState({ newName: val });
    } else if (name === 'avatar') {
      this.setState({ newAvatar: val });
    }
  };

  handleSubmit = () => {
    console.log('submitting');
    let newUser = {};
    if (this.state.newAvatar) {
      newUser.avatar_url = this.state.newAvatar;
    }
    if (this.state.newName) {
      newUser.name = this.state.newName;
    }
    console.log(newUser);
    editUserProfile(newUser, this.state.user.username).then(data => {
      this.toggleShowEdit();
      this.setState({ user: data.user });
    });
  };

  componentDidMount() {
    fetchUser(this.props.username)
      .then(data => {
        this.setState({ user: data });
      })
      .catch(err => {
        const msg = err.response.data.msg;
        navigate('/Error', { replace: true, state: { msg } });
      });
    fetchArticles({ author: this.props.username }).then(data =>
      this.setState({ articles: data.articles }),
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentTopic !== prevProps.currentTopic) {
      fetchArticles({
        author: this.props.username,
        topic: this.props.currentTopic,
      }).then(data => this.setState({ articles: data.articles }));
    }
  }
}

export default User;
