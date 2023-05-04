import React from "react";
import "./reset.css"
import axios from 'axios';
import { useContext, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HabitContext from '../contexts/HabitContext'

import LoginCharacter from "../../assets/images/login-character.png"

function Reenter() {
  const {getUserData, getID} = useContext(HabitContext);

  // use toastify to notify user on error for username or email that's already in use
  const notify = (error)=>{
    if(error === "Username"){
      toast.error('Username Does Not Exist!',{
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

  // use navigate uses Router to navigate to different paths
  const navigate = useNavigate();
  const routeLanding = () =>{
    let path = '/CSE442-542/2023-Spring/cse-442q/';
    navigate(path)
  }
  const routeLogin = () =>{
    let path = '/CSE442-542/2023-Spring/cse-442q/login'
    navigate(path)
  }

  // state variables for the form inputs: username, email, password, and confirm password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // functions to update the state variables when the user types in the form inputs
  const changeUsername = (event) => { 
    setUsername(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };
  const changeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  // function to handle the form submission
  const handleSubmit = async(event) => {
    event.preventDefault();
    if (password == confirmPassword) {
      const request = await makePost();
    }
  };

  // use axios to send the post request to php server
  // localhost points to the php server tht is created when you cd into PHP directory and run php -S localhost:8000
  // need to have actual url to access server
  const makePost = async() => {
    await axios({
      method: "post",
      url: "http://localhost:8000/reenter.php",
      //url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442q/reenter.php",
      data: {
        username: username,
        password: password
      },
      headers: { "Content-Type": "multipart/form-data" },
    }).then(async function (response) {
      // php echos back message on response, successful response will contain user id
      const data = (response.data).split('\n');
      if (data[1] === 'Invalid Username'){
        console.log("invalid username");
        notify("Username");
      } else{
        // successful submit will navigate to next page
        console.log("success");
        console.log(response)
        console.log(response.data);

        sessionStorage.setItem('id', data[1]);
        const user_info = await getUserData(data[1]);

        // setCookie("uid", username, 1);
         routeLogin();
      }
    }).catch(function (error) {
      console.log("failed to send post request");
      console.log(error);
      console.log('error is '+ error.msg);
    });
  }

  return(
      <>
      <div id="login-back-link">
        <button id="back_buton" onClick={routeLanding}>&lt; Back</button>
      </div>
      <div className="login-container">
          <div id="login-main">
              <div id="login-greeting">
                  <h2>New Password!</h2>
                  <img src={LoginCharacter} alt="login-character" />
              </div>
              <div id="login-form">
                <ToastContainer />
                <form method="post" onSubmit={handleSubmit}>
                    <div className="login-form-field">
                        <label>
                            <h6>Username:</h6>
                            <input type="text" name="username" size="30" onChange={changeUsername} />
                        </label>
                        <label>
                            <h6>Enter your new password:</h6>
                            <input type="text" name="password" size="30" onChange={changePassword} />
                        </label>
                        <label>
                            <h6>Re-enter new password:</h6>
                            <input type="text" name="password" size="30" onChange={changeConfirmPassword} />
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

export default Reenter;