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
          <h2>{props.article.title} </h2>
        </Link>
        <Link to={`/users/${props.article.author}`} className="link">
          <h3>{props.article.author} </h3>
        </Link>
        <h3>{props.article.topic} </h3>
        <h3>{props.article.votes}</h3>
      </header>
      <p>
        {props.article.body
          .split(' ')
          .slice(0, 20)
          .join(' ') + '...'}
      </p>
    </div>
  );
};

export default ArticleCard;
