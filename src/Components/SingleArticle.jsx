import React, { Component } from 'react';
import ArticleComments from './ArticleComments';
import Axios from 'axios';
import VoteButtons from './VoteButtons';
import { updateArticleVotes } from '../api';
import { navigate } from '@reach/router';
import Loading from './Loading';

class SingleArticle extends Component {
  state = {
    article: null,
    currentArticleVotes: 0,
    votingError: false,
    voteLoading: false,
  };
  render() {
    const {article, currentArticleVotes, votingError, voteLoading} = this.state
    const {currentUser, article_id} = this.props
    return (
      <div className="single-article">
        {article && (
          <div>
            {voteLoading && <Loading />}
            <header className="single-article-header">
              <h1>{article.title}</h1>
            </header>
            <main>
              <div className="single-article-subtitle">
                <h3 className=" article-author">
                  -{article.author}
                </h3>
                <h3>[{article.topic}]</h3>
                <div className="single-article-votes">
                  <h3>
                    {article.votes + currentArticleVotes}
                  </h3>
                  {currentUser && (
                    <VoteButtons
                      handleArticleVote={this.handleArticleVote}
                      currentArticleVotes={currentArticleVotes}
                    />
                  )}
                </div>
              </div>

              {votingError && (
                <p>
                  Oh no! Something went wrong with your vote, please try again
                  soon!
                </p>
              )}
              <p>{article.body}</p>
            </main>
            <ArticleComments
              article_id={article_id}
              currentUser={currentUser}
            />
          </div>
        )}
      </div>
    );
  }

  handleArticleVote = vote => {
    const {article} = this.state
    this.setState({ voteLoading: true }, () => {
      updateArticleVotes(article.article_id, vote)
        .then(() =>
          this.setState(prevState => {
            return {
              currentArticleVotes: prevState.currentArticleVotes + vote,
              votingError: false,
              voteLoading: false,
            };
          }),
        )
        .catch(() => {
          this.setState({ votingError: true });
        });
    });
  };

  componentDidMount() {
    const {article_id} = this.props
    Axios.get(
      `https://northcoders-news-server.herokuapp.com/api/articles/${
        article_id
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
