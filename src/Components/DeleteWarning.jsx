import React from 'react';

const DeleteWarning = props => {
  return (
    <div className="warning-popup">
      <h1 className="warning-text">
        Warning! This will irreversibly delete your article, are you sure?
      </h1>
      <button onClick={props.confirmDeleteArticle} className="bad-button">
        Yes, delete it
      </button>
      <button onClick={() => props.handleDelete()} className="good-button">
        No, wait!
      </button>
    </div>
  );
};

export default DeleteWarning;
