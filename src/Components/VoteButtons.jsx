import React from 'react';

const VoteButtons = props => {
  return (
    <div className="vote-buttons">
      <button
        className="upvote"
        onClick={() => props.handleVoteClick(1, props.type)}
      >
        ⬆
      </button>
      <button
        className="downvote"
        onClick={() => props.handleVoteClick(-1, props.type)}
      >
        ⬇
      </button>
    </div>
  );
};

export default VoteButtons;
