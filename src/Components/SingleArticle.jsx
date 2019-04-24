import React, { Component } from 'react';
import ArticleComments from './ArticleComments';
import Axios from 'axios';
import VoteButtons from './VoteButtons';
import { updateArticleVotes } from '../api';

class SingleArticle extends Component {
  state = {
    article: null,
    currentArticleVotes: 0,
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
                <h3>
                  {this.state.article.votes + this.state.currentArticleVotes}
                </h3>
                {this.props.currentUser && (
                  <VoteButtons
                    handleArticleVote={this.handleArticleVote}
                    currentArticleVotes={this.state.currentArticleVotes}
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

  handleArticleVote = vote => {
    updateArticleVotes(this.state.article.article_id, vote).then(data =>
      this.setState(prevState => {
        return { currentArticleVotes: prevState.currentArticleVotes + vote };
      }),
    );
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
