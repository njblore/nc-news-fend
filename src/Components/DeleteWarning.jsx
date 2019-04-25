import React from 'react';

const DeleteWarning = props => {
  return (
    <div className="warning-popup">
      <h1>
        Warning! This will irreversibly delete your article, are you sure?
      </h1>
      <button onClick={props.confirmDeleteArticle}>Yes, delete it</button>
      <button onClick={() => props.handleDelete()}>No, wait!</button>
    </div>
  );
};

export default DeleteWarning;
