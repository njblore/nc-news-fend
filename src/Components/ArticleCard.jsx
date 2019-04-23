import React from 'react';

const ArticleCard = props => {
  return (
    <div>
      <header>
        <h3>{props.article.author}</h3>
        <h2>{props.article.title}</h2>
        <h3>{props.article.topic}</h3>
        <h3>{props.article.votes}</h3>
      </header>
      <p>{props.article.body}</p>
    </div>
  );
};

export default ArticleCard;
