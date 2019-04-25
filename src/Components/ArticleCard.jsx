import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = props => {
  return (
    <div className="article-card">
      <header className="article-preview-header">
        <Link
          to={`/articles/${props.article.article_id.toString()}`}
          className="link"
        >
          <h2 className="article-title no-margin">
            {props.article.title
              .split(' ')
              .slice(0, 7)
              .join(' ') + '...'}
          </h2>
        </Link>
        <div className="article-header-subtitle">
          <Link to={`/users/${props.article.author}`} className="link">
            <h3 className="no-margin">{props.article.author} </h3>
          </Link>
          <h3 className="no-margin">{props.article.topic} </h3>
          <h3 className="no-margin">{props.article.votes}</h3>
        </div>
      </header>
      <p className="no-margin preview-body">
        {props.article.body
          .split(' ')
          .slice(0, 10)
          .join(' ') + '...'}
      </p>
    </div>
  );
};

export default ArticleCard;
