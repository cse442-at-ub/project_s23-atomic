import React from "react";
import "./login.css"
import axios from 'axios';
import { useContext, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HabitContext from '../contexts/HabitContext'

import LoginCharacter from "../../assets/images/login-character.png"

function Login() {
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
    }else{
      toast.error('Incorrect Password',{
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

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  } 

  // use navigate uses Router to navigate to different paths
  const navigate = useNavigate();
  const routeHomepage = (id) =>{ 
      let path = '/CSE442-542/2023-Spring/cse-442q/homepage'; 
      navigate(path, {state: {user: id}});
  }
  const routeLanding = () =>{
    let path = '/CSE442-542/2023-Spring/cse-442q/';
    navigate(path)
  }

  const routeReset = () =>{
    let path = '/CSE442-542/2023-Spring/cse-442q/reset';
    navigate(path)
  }

  useEffect(() => {
    checkCookie();
  }, []);

  // check if user is already logged in
  const checkCookie = async() => {

    var userID = getCookie('uid');

    // console.log(userID)
    if(userID !== ""){
      // console.log("cookie exists")
      // get users data from database and store in context
      const request = await getID(userID);
      console.log(request)
      // set correct session storage id
      sessionStorage.setItem("id", request.id);
      navigate("/CSE442-542/2023-Spring/cse-442q/homepage");
    }


  }

  // state variables for the form inputs: username, email, password, and confirm password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // functions to update the state variables when the user types in the form inputs
  const changeUsername = (event) => { 
    setUsername(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
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
      url: "http://localhost:8000/login.php",
      //url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442q/login.php",
      data: {
        username: username,
        password: password,
      },
      headers: { "Content-Type": "multipart/form-data" },
    }).then(async function (response) {
      // php echos back message on response, successful response will contain user id
      const data = (response.data).split('\n');
      if (data[1] === 'Invalid Password'){
        console.log("invalid password");
        notify("Password");
      } else if (data[1] === 'Invalid Username'){
        console.log("invalid username");
        notify("Username");
      } else{
        // successful submit will navigate to next page
        console.log("success");
        console.log(response)
        console.log(response.data);

        sessionStorage.setItem('id', data[1]);
        const user_info = await getUserData(data[1]);

        setCookie("uid", username, 1);
        routeHomepage(parseInt(data[1]));
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
                  <h2>Let's sign in!</h2>
                  <img src={LoginCharacter} alt="login-character" />
              </div>
              <div id="login-form">
                <ToastContainer />
                <form method="post" onSubmit={handleSubmit}>
                    <div className="login-form-field">
                        <label>
                            <h6>Username</h6>
                            <input type="text" name="username" size="30" onChange={changeUsername} />
                        </label>
                    </div>
                    <div className="login-form-field">
                        <label>
                            <h6>Password</h6>
                            <input type="password" name="password" size="30" onChange={changePassword}/>
                        </label>
                    </div>
                    <div id="login-submit">
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
                <div id="login-submit">
                        <input type="submit" value="Forgot Password" onClick={routeReset}/>
                    </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default Login;
