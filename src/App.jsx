import React from 'react';
// import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter,
  BrowserRouter as Navigate, Route, Routes
} from 'react-router-dom';

import Login from './components/Login/Login';
import Signin from './components/Registration/Signin';
import ChooseHabits from './components/Registration/ChooseHabits';
import Landing from './components/Landing/Landing'
import HomeMain from './components/Homepage/HomeMain';
import Statistics from './components/Statistics/Stats';
import Settings from './components/Settings/settings'
import Information from './components/Information/Info'
import CreateNew from './components/CreateNew/create'
import Options from './components/CreateNew/Options'
import Suggestions from './components/CreateNew/Suggestions'
import Detail from './components/HabitView/Detail'

function App() {
  return (
    // BrowserRouter is used to route and display components at certain paths
    <BrowserRouter>
    <div className="App">

      {/* // defines what path display which component */}
      <Routes>
        <Route path="/~argraca" element={<Landing />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/choose-habit" element={<ChooseHabits />} />   
        <Route path="/homepage" element={<HomeMain />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/information" element={<Information />} />
        <Route path="/create" element={<CreateNew />} />
        <Route path="/options" element={<Options />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>    

    </div>
    </BrowserRouter>
  );
}

export default App;
