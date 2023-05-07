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
import Information from './components/Information/Info';
import CreateNew from './components/CreateNew/create';
import Options from './components/CreateNew/Options';
import Suggestions from './components/CreateNew/Suggestions';
import Detail from './components/HabitView/Detail';
import Edit from './components/Edit/Edit';
import Reset from './components/Reset/Reset';
import Resetcode from './components/Reset/Resetcode'
import Reenter from './components/Reset/Reenter'

import {HabitProvider} from './components/contexts/HabitContext';

function App() {
  return (
    // BrowserRouter is used to route and display components at certain paths
    <BrowserRouter>
    <div className="App">
      <HabitProvider>
      {/* // defines what path display which component */}
      <Routes>
        <Route path="/CSE442-542/2023-Spring/cse-442q/" element={<Landing />} />
        <Route path="/" element={<Landing />} />
        <Route path="/CSE442-542/2023-Spring/cse-442q/login" element={<Login />} />
        <Route path="/CSE442-542/2023-Spring/cse-442q/signup" element={<Signin />} />
        <Route path="/CSE442-542/2023-Spring/cse-442q/choose-habit" element={<ChooseHabits />} />   
        <Route path="/CSE442-542/2023-Spring/cse-442q/homepage" element={<HomeMain />} />
        <Route path="/CSE442-542/2023-Spring/cse-442q/statistics" element={<Statistics />} />
        <Route path="/CSE442-542/2023-Spring/cse-442q/information" element={<Information />} />
        <Route path="/CSE442-542/2023-Spring/cse-442q/create" element={<CreateNew />} />
        <Route path="/CSE442-542/2023-Spring/cse-442q/options" element={<Options />} />
        <Route path="/CSE442-542/2023-Spring/cse-442q/suggestions" element={<Suggestions />} />
        <Route path="/CSE442-542/2023-Spring/cse-442q/detail" element={<Detail />} />
        <Route path="/CSE442-542/2023-Spring/cse-442q/edit" element={<Edit />} />
        <Route path="/CSE442-542/2023-Spring/cse-442q/reset" element={<Reset />} />
        <Route path="/CSE442-542/2023-Spring/cse-442q/resetcode" element={<Resetcode />} />
        <Route path="/CSE442-542/2023-Spring/cse-442q/reenter" element={<Reenter />} />
      </Routes>  
      </HabitProvider>  
    </div>
    </BrowserRouter>
  );
}

export default App;
