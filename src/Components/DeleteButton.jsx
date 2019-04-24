import React from 'react';

const DeleteButton = props => {
  return (
    <div>
      <button className="delete-button" onClick={props.handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
