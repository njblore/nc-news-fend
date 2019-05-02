import React from 'react';

const VoteButtons = props => {
  const voteFunction = props.handleArticleVote
    ? props.handleArticleVote
    : props.handleCommentVote;

  return (
    <div className="vote-buttons">
      <button
        className="good-button"
        onClick={() => voteFunction(1, props.comment_id)}
        disabled={props.currentArticleVotes === 1 || props.commentVote === 1}
      >
        ⬆
      </button>
      {props.votes && <p>{props.votes + props.votesToAdd}</p>}
      <button
        className="bad-button"
        onClick={() => voteFunction(-1, props.comment_id)}
        disabled={props.currentArticleVotes === -1 || props.commentVote === -1}
      >
        ⬇
      </button>
    </div>
  );
};

export default VoteButtons;
