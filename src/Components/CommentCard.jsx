import React from 'react';

const CommentCard = props => {
  console.log(props);
  return (
    <div>
      <p>{props.comment.author}</p>
      <p>{props.comment.body}</p>
    </div>
  );
};

export default CommentCard;
