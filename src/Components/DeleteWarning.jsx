import React from 'react';

const DeleteWarning = props => {
  return (
    <div className="warning-popup popup">
      <h1 className="warning-text">
        Warning! This will irreversibly delete your article, are you sure?
      </h1>
      
      <button onClick={props.handleDelete} className="good-button">
        No, wait!
      </button><button onClick={props.confirmDeleteArticle} className="bad-button">
        Yes, delete it
      </button>
    </div>
  );
};

export default DeleteWarning;
