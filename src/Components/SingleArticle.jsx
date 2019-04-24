import React, { Component } from 'react';
import ArticleComments from './ArticleComments';
import Axios from 'axios';
import VoteButtons from './VoteButtons';
import { updateArticleVotes } from '../api';

class SingleArticle extends Component {
  state = {
    article: null,
    votesMade: 0,
  };
  render() {
    return (
      <div>
        {this.state.article && (
          <div>
            <main className="single-article">
              <header className="article-header">
                <h1>{this.state.article.title}</h1>
                <h3>{this.state.article.author}</h3>
                <h3>{this.state.article.topic}</h3>
                <h3>{this.state.article.votes + this.state.votesMade}</h3>
                {this.props.currentUser && (
                  <VoteButtons
                    handleVoteClick={this.handleVoteClick}
                    type="article"
                  />
                )}
              </header>
              <p>{this.state.article.body}</p>
            </main>
            <ArticleComments
              article_id={this.props.article_id}
              currentUser={this.props.currentUser}
            />
          </div>
        )}
      </div>
    );
  }

  handleVoteClick = (vote, target) => {
    if (target === 'article') {
      updateArticleVotes(this.state.article.article_id, vote).then(data =>
        this.setState(prevState => {
          return { votesMade: prevState.votesMade + vote };
        }),
      );
    }
  };

  componentDidMount() {
    Axios.get(
      `https://northcoders-news-server.herokuapp.com/api/articles/${
        this.props.article_id
      }`,
    ).then(({ data }) => this.setState({ article: data.article }));
  }
}

export default SingleArticle;
