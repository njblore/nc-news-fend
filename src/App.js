import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './Components/Header';
import Login from './Components/Login';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Articles path="/" />
          <SingleArticle path="/:article_id" />
          <Login path="/login" />
        </Router>
      </div>
    );
  }
}

export default App;
