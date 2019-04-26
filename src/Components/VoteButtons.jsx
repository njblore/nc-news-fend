import React from 'react';

const VoteButtons = props => {
  const voteFunction = props.handleArticleVote
    ? props.handleArticleVote
    : props.handleCommentVote;

  console.log(voteFunction);

  return (
    <div className="vote-buttons">
      <button
        className="good-button"
        onClick={() => voteFunction(1, props.comment_id, props.article_id)}
        disabled={props.currentArticleVotes === 1 || props.commentVote === 1}
      >
        ⬆
      </button>
      <button
        className="bad-button"
        onClick={() => voteFunction(-1, props.comment_id, props.article_id)}
        disabled={props.currentArticleVotes === -1 || props.commentVote === -1}
      >
        ⬇
      </button>
    </div>
  );
};

export default VoteButtons;
