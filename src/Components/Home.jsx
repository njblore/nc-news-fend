import React from 'react';
import { Link } from '@reach/router';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Northcoders News!</h1>
      <Link to="/articles">View Recent Articles</Link>
      <Link to="/articles/33">View Random Article</Link>
    </div>
  );
};

export default Home;
