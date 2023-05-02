import React from "react";
import "./reset.css"
import axios from 'axios';
import { useContext, useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HabitContext from '../contexts/HabitContext'

import LoginCharacter from "../../assets/images/login-character.png"

function Resetcode() {
  const {getUserData, getID} = useContext(HabitContext);

  // use toastify to notify user on error for username or email that's already in use
  const notify = (error)=>{
    if(error === "Email"){
      toast.error('Email Does Not Exist!',{
          position: "top-center",
          autoClose: 1050,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
    })
    }  
  }

  const { state } = useLocation();

  // use navigate uses Router to navigate to different paths
  const navigate = useNavigate();
  const routereenter = () =>{
    let path = '/CSE442-542/2023-Spring/cse-442q/reenter';
    navigate(path)
  }
  
  const routeLanding = () =>{
    let path = '/CSE442-542/2023-Spring/cse-442q/';
    navigate(path)
  }

  // state variables for the form inputs: username, email, password, and confirm password
  const [code, setCode] = useState('');

  // functions to update the state variables when the user types in the form inputs
  const changeCode = (event) => { 
    setCode(event.target.value);
  };

  // function to handle the form submission
  const handleSubmit = async(event) => {
    event.preventDefault();
    if (code == state.message) {
      routereenter();
    }
    // routereenter();
  };

  return(
      <>
      <div id="login-back-link">
          <button id="back_button" onClick={routeLanding}>Back</button>
      </div>
      <div className="login-container">
          <div id="login-main">
              <div id="login-greeting">
                  <h2>Enter Code!</h2>
                  <img src={LoginCharacter} alt="login-character" />
              </div>
              <div id="login-form">
                <ToastContainer />
                <form method="post" onSubmit={handleSubmit}>
                    <div className="login-form-field">
                        <label>
                            <h6>Your four digit code:</h6>
                            <input type="text" name="username" size="30" onChange={changeCode} />
                        </label>
                    </div>
                    <div id="login-submit">
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
              </div>
          </div>
      </div>
    </>
  )
}

export default Resetcode;