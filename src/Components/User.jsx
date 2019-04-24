import React, { Component } from 'react';
import { fetchUser, fetchArticles } from '../api';
import ArticleCard from './ArticleCard';
import { Link } from '@reach/router';

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
                  <Link
                    to={`/${article.article_id.toString()}`}
                    key={article.article_id}
                    className="link"
                  >
                    <ArticleCard article={article} />
                  </Link>
                );
              })}
          </>
        )}
      </div>
    );
  }

  componentDidMount() {
    fetchUser(this.props.username).then(data => {
      this.setState({ user: data });
    });
    fetchArticles({ author: this.props.username }).then(data =>
      this.setState({ articles: data }),
    );
    console.log(this.props);
  }
}

export default User;
