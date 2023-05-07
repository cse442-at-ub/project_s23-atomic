import React from "react";
import "./reset.css"
import axios from 'axios';
import { useContext, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HabitContext from '../contexts/HabitContext'

import LoginCharacter from "../../assets/images/login-character.png"

function Reset() {
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

  // use navigate uses Router to navigate to different paths
  const navigate = useNavigate();
  const routeresetcode = (id, msg) =>{ 
      let path = '/CSE442-542/2023-Spring/cse-442q/resetcode'; 
      navigate(path, {state: {user: id, message: msg}});
  }
  // const routeresetcode = (id) =>{ 
  //   let path = '/CSE442-542/2023-Spring/cse-442q/resetcode'; 
  //   navigate(path, {state: {user: id}});
  // }
  const routeLanding = () =>{
    let path = '/CSE442-542/2023-Spring/cse-442q/';
    navigate(path)
  }

  // state variables for the form inputs: username, email, password, and confirm password
  const [email, setEmail] = useState('');

  // functions to update the state variables when the user types in the form inputs
  const changeEmail = (event) => { 
    setEmail(event.target.value);
  };

  // function to handle the form submission
  const handleSubmit = async(event) => {
    event.preventDefault();
    const request = await makePost();
  };

  // use axios to send the post request to php server
  // localhost points to the php server tht is created when you cd into PHP directory and run php -S localhost:8000
  // need to have actual url to access server
  const makePost = async() => {
    await axios({
      method: "post",
      //url: "http://localhost:8000/resetcode.php",
      url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442q/resetcode.php",
      data: {
        email: email
      },
      headers: { "Content-Type": "multipart/form-data" },
    }).then(async function (response) {
      // php echos back message on response, successful response will contain user id
      const data = (response.data).split('\n');
      if (data[1] === 'Invalid Email'){
        console.log("invalid Email");
        notify("Email");
      } else{
        // successful submit will navigate to next page
        console.log("success");
        console.log(response)
        console.log(response.data);

        sessionStorage.setItem('id', data[1]);
        const user_info = await getUserData(data[1]);

        // setCookie("uid", username, 1);
         routeresetcode(parseInt(data[1]), parseInt(data[2]));
        //  routeresetcode(parseInt(data[1]));
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
                  <h2>Let's Reset!</h2>
                  <img src={LoginCharacter} alt="login-character" />
              </div>
              <div id="login-form">
                <ToastContainer />
                <form method="post" onSubmit={handleSubmit}>
                    <div className="login-form-field">
                        <label>
                            <h6>Email</h6>
                            <input type="text" name="username" size="30" onChange={changeEmail} />
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

export default Reset;
