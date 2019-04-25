import React from 'react';

const Error = props => {
  return (
    <div>
      {props.location.state ? (
        <p>Opps! {props.location.state.msg} :(</p>
      ) : (
        <p>Opps! Page Not Found :(</p>
      )}
    </div>
  );
};

export default Error;
