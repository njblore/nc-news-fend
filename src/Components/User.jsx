import React, { Component } from 'react';
import { fetchUser, fetchArticles } from '../api';
import ArticleCard from './ArticleCard';

class User extends Component {
  state = { user: null, articles: null };
  render() {
    return (
      <div>
        {this.state.user && (
          <>
            <h2>{this.state.user.name}</h2>
            <h3>Articles By {this.state.user.name}:</h3>
            {this.state.articles &&
              this.state.articles.map(article => {
                return <ArticleCard article={article} />;
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
  }
}

export default User;
