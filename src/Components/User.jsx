import React, { Component } from 'react';
import { fetchUser, fetchArticles } from '../api';
import ArticleCard from './ArticleCard';
import { Link } from '@reach/router';
import VoteButtons from './VoteButtons';
import DeleteButton from './DeleteButton';
import { navigate } from '@reach/router/lib/history';

class User extends Component {
  state = { user: null, articles: null };
  render() {
    return (
      <div>
        {this.state.user && (
          <>
            {this.props.location.state ? (
              <>
                <h2>Welcome Back {this.state.user.name}!</h2>
                <img src={this.state.user.avatar_url} alt="user avatar" />
                <h3> My Articles: </h3>
              </>
            ) : (
              <>
                <h2>{this.state.user.name}</h2>
                <h3>Articles By {this.state.user.name}:</h3>
              </>
            )}

            {this.state.articles &&
              this.state.articles.map(article => {
                return (
                  <div className="article-link" key={article.article_id}>
                    {this.props.currentUser && <VoteButtons />}
                    <Link
                      to={`/${article.article_id.toString()}`}
                      className="link"
                    >
                      <ArticleCard article={article} />
                    </Link>
                    {this.props.currentUser &&
                      this.props.currentUser === article.author && (
                        <DeleteButton />
                      )}
                  </div>
                );
              })}
          </>
        )}
      </div>
    );
  }

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
      this.setState({ articles: data }),
    );
  }
}

export default User;
