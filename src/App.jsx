import React from 'react';
// import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter,
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';

import Signin from './components/Registration/Signin';
import ChooseHabits from './components/Registration/ChooseHabits';
import Landing from './components/Landing/Landing'

function App() {
  return (
    // BrowserRouter is used to route and display components at certain paths
    <BrowserRouter>
    <div className="App">

      {/* // defines what path display which component */}
      {/* may need to change to work with php, but can be used for frontend testing purposes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/choose-habit" element={<ChooseHabits />} />   
      </Routes>    


      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

    </div>
    </BrowserRouter>
  );
}

export default App;
