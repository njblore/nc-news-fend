import React from 'react';

const VoteButtons = props => {
  const voteFunction = props.handleArticleVote
    ? props.handleArticleVote
    : props.handleCommentVote;

  return (
    <div className="vote-buttons">
      <button
        className="upvote"
        onClick={() => voteFunction(1, props.comment_id)}
        disabled={
          props.currentArticleVotes === 1 || props.currentCommentVotes === 1
        }
      >
        ⬆
      </button>
      <button
        className="downvote"
        onClick={() => voteFunction(-1, props.comment_id)}
        disabled={
          props.currentArticleVotes === -1 || props.currentCommentVotes === -1
        }
      >
        ⬇
      </button>
    </div>
  );
};

export default VoteButtons;
