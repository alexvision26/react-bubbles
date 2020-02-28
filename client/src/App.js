import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';

import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <div className='links'>
          <Link to='/'>Login</Link>
          <Link to='/bubbles'>Bubbles</Link>
          </div>
        </nav>
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute path='/bubbles' component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
