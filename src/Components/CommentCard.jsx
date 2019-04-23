import React from 'react';

const CommentCard = props => {
  const postedAt = new Date(Date.parse(props.comment.created_at));
  return (
    <div>
      <header className="article-header">
        <p>{props.comment.author}</p>
        <p>Posted On: {postedAt.toDateString()}</p>
        <p>{props.comment.votes} Points</p>
      </header>

      <p>{props.comment.body}</p>
    </div>
  );
};

export default CommentCard;
