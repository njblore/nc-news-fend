import React, { Component } from 'react';
import ArticleComments from './ArticleComments';
import Axios from 'axios';
import VoteButtons from './VoteButtons';
import { updateArticleVotes } from '../api';
import { navigate } from '@reach/router';

class SingleArticle extends Component {
  state = {
    article: null,
    currentArticleVotes: 0,
    votingError: false,
  };
  render() {
    return (
      <div className="single-article">
        {this.state.article && (
          <div>
            <header className="single-article-header">
              <h1>{this.state.article.title}</h1>
            </header>
            <main>
              <div className="single-article-subtitle">
                <h3 className=" article-author">
                  -{this.state.article.author}
                </h3>
                <h3>[{this.state.article.topic}]</h3>
                <div className="single-article-votes">
                  <h3>
                    {this.state.article.votes + this.state.currentArticleVotes}
                  </h3>
                  {this.props.currentUser && (
                    <VoteButtons
                      handleArticleVote={this.handleArticleVote}
                      currentArticleVotes={this.state.currentArticleVotes}
                    />
                  )}
                </div>
              </div>

              {this.state.votingError && (
                <p>
                  Oh no! Something went wrong with your vote, please try again
                  soon!
                </p>
              )}
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

  handleArticleVote = vote => {
    updateArticleVotes(this.state.article.article_id, vote)
      .then(() =>
        this.setState(prevState => {
          return {
            currentArticleVotes: prevState.currentArticleVotes + vote,
            votingError: false,
          };
        }),
      )
      .catch(() => {
        this.setState({ votingError: true });
      });
  };

  componentDidMount() {
    Axios.get(
      `https://northcoders-news-server.herokuapp.com/api/articles/${
        this.props.article_id
      }`,
    )
      .then(({ data }) => this.setState({ article: data.article }))
      .catch(err => {
        const msg =
          err.response.status === 404
            ? err.response.data.msg
            : 'Not A Valid Article';
        navigate('/error', {
          replace: true,
          state: { msg },
        });
      });
  }
}

export default SingleArticle;
