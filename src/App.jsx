import React from 'react';
import logo from './logo.svg';
import './App.css';

import Signin from './components/Registration/Signin';
import ChooseHabits from './components/Registration/ChooseHabits';
import Landing from './components/Landing/Landing'

function App() {
  return (
    <div className="App">
     <header className="App-header">
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
      </header>

      {/* <Signin /> */}
      {/* <ChooseHabits /> */}
      {/* <Landing /> */}

    </div>
  );
}

export default App;
