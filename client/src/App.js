import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';

import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <Router>
      <div className="App">
          <div className='links'>
          <Link to='/'><h4>Login</h4></Link>
          <h4><Link to='/bubbles'>Bubbles</Link></h4>
          <h2 className='title'>Bubble<span className='app-title'>App</span></h2>
          </div>
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
