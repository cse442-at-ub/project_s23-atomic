import React from "react";
import "./login.css"
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import LoginCharacter from "../../assets/images/login-character.png"

function Login() {

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
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  } 
    // use navigate uses Router to navigate to different paths
  const navigate = useNavigate();
  const routeHomepage = (id) =>{ 
      let path = '/homepage'; 
      navigate(path, {state: {user: id}});
  }
  const routeLanding = () =>{
    let path = '/~argraca'
    navigate(path)
  }

  var userID = getCookie('uid');
  if(userID !== ""){
    window.location = "/homepage";
  }
  // state variables for the form inputs: username, email, password, and confirm password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // state variable to track where errors occur in the form
  let error = {
    username: 'true',
    password: 'true',
    usermsg: ""
  };

  // functions to update the state variables when the user types in the form inputs
  const changeUsername = (event) => { 
    setUsername(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };
  // functions to check the form inputs for errors
  const checkUsername = () => {
    if (username.length < 1) {
      error['username'] = 'false';
      return false;
    }else{
      error['username'] = 'true';
      return true;
    }
  };

  const checkPasswordLength = () => {
    if (password.length < 1) {
      error['password'] = 'false';
      return false;
    }else{
      error['password'] = 'true';
      return true;
    }
  };

  // function to handle the form submission
  const handleSubmit = async(event) => {
    event.preventDefault();
    
    let valid_username = checkUsername();
    let valid_length = checkPasswordLength();

    if (valid_username && valid_length) {
      console.log("working");
      // call makePost to make axios post request
      const request = await makePost();
      
    } else {
      console.log('Credential fields empty');
      console.log(error)
      console.log(error['username'] === 'false')
    }
  };

  // use axios to send the post request to php server
  // localhost points to the php server tht is created when you cd into PHP directory and run php -S localhost:8000
  // need to have actual url to access server
  const makePost = async() => {
    await axios({
      method: "post",
      url: "http://localhost:8000/login.php",
      // url: "https://www-student.cse.buffalo.edu/~argraca/login.php",
      data: {
        username: username,
        password: password,
      },
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
      // php echos back message on response, successful response will contain user id
      const data = (response.data).split('\n');
      if (data[1] === 'Invalid'){
        error['usermsg'] = "Invalid Username or Password";
        error['username'] = 'true';
        error['password'] = 'true';
        console.log(error['username'])
      }else{
        // successful submit will navigate to next page
        console.log("success");
        console.log(response)
        console.log(response.data);
        // initialize original error messages
        error['usermsg'] = ""
        error['password'] = 'true'
        error['username'] = 'true'
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
            <button id="back_button" onClick={routeLanding}>Back</button>
        </div>
        <div className="login-container">
            <div id="login-main">
                <div id="login-greeting">
                    <h2>Let's sign in!</h2>
                    <img src={LoginCharacter} alt="login-character" />
                </div>
                <div id="login-form">
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
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;
