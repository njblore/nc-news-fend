import React from 'react';

const ArticleCard = props => {
  return (
    <div className="article-card">
      <header className="article-header">
        <h2>{props.article.title}</h2>
        <h3>{props.article.author} </h3>
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
