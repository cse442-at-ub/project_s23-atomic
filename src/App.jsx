import React from 'react';
// import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter,
  BrowserRouter as Navigate, Route, Routes
} from 'react-router-dom';

import Signin from './components/Registration/Signin';
import ChooseHabits from './components/Registration/ChooseHabits';
import Landing from './components/Landing/Landing'
import HomeMain from './components/Homepage/HomeMain';
import Statistics from './components/Statistics/Stats';
import Settings from './components/Settings/settings'
import Information from './components/Information/Info'
import CreateNew from './components/CreateNew/create'

function App() {
  return (
    // BrowserRouter is used to route and display components at certain paths
    <BrowserRouter>
    <div className="App">

      {/* // defines what path display which component */}
      {/* may need to change to work with php, but can be used for frontend testing purposes */}
      <Routes>
        {/* // root usually is  path / so redirect / path to correct root path */}
        {/* <Route path='/' element={<Navigate to='/~argraca' />} /> */}
        <Route path="/~argraca" element={<Landing />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/choose-habit" element={<ChooseHabits />} />   
        <Route path="/homepage" element={<HomeMain />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/information" element={<Information />} />
        <Route path="/create" element={<CreateNew />} />
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
