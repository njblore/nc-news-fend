import React from 'react';
import { Link } from '@reach/router';

const Header = props => {
  return (
    <div className="header">
      <h1>Northcoders News</h1>
      <nav>
        <button>
          <Link to="/" className="link">
            Articles
          </Link>
        </button>
        <button onClick={props.toggleTopics}>Topics</button>
        <button>Log In</button>
      </nav>
    </div>
  );
};

export default Header;
