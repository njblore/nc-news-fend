import React from 'react';

const DeleteButton = props => {
  return (
    <div>
      <button
        className="delete-button"
        onClick={() => props.handleDelete(props.article_id)}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
