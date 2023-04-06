import React from 'react';
import './sign-in.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {

  // use navigate uses Router to navigate to different paths
  const navigate = useNavigate();
  const routeChooseHabits = (id) =>{ 
      let path = `/choose-habit`; 
      navigate(path, {state: {user: id}});
  }
  const routeLogin = () =>{
    let path = '/login'
    navigate(path)
  }
  const routeLanding = () =>{
    let path = '/~argraca'
    navigate(path)
  }


  // state variables for the form inputs: username, email, password, and confirm password
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  // state variable to track where errors occur in the form
  // emailmsg and usermsg are used in order to change the error message when the 
  // email or username is not unique after checking the database and receiving the response
  let error = {
    username: 'true',
    email: 'true',
    password: 'true',
    confirmPassword: 'true',
    usermsg: "",
    emailmsg: ""
  };


  // functions to update the state variables when the user types in the form inputs
  const changeUsername = (event) => { 
    setUsername(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const changeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  // functions to check the form inputs for errors
  const checkPassword = () => {
    if (password !== confirmPassword) {
      error['confirmPassword'] = 'false';
      return false;
    } else{
      error['confirmPassword'] = 'true';
      return true;
    }
  };

  const checkUsername = () => {
    if (username.length < 3) {
      error['username'] = 'false';
      return false;
    }else{
      error['username'] = 'true';
      return true;
    }
  };

  const checkPasswordLength = () => {
    if (password.length < 8) {
      error['password'] = 'false';
      return false;
    }else{
      error['password'] = 'true';
      return true;
    }
  };

  // function to validate email 
  const checkEmail = (e) => {
    var pattern = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    var valid = pattern.test(e);
    return valid
  }

  // use toastify to notify user on error for username or email that's already in use
  const notify = (error)=>{
    if(error === "Username"){
      toast.error('Username Already In Use',{position: toast.POSITION.TOP_RIGHT, autoClose:false,theme:"colored"})
    }else{
      toast.error('Email already in Use.',{position: toast.POSITION.TOP_RIGHT, autoClose:false,theme:"colored"})
    }   
  }

  // function to handle the form submission
  const handleSubmit = async(event) => {
    event.preventDefault();
    
    let valid_username = checkUsername();
    let valid_email = checkEmail(email);
    // email regex check will return true if email is empty
    if (email === '') {
      valid_email = false
      error['email'] = 'false'
    }
    let valid_length = checkPasswordLength();
    let valid_password = checkPassword();

    if (valid_username && valid_email && valid_length && valid_password) {
      // call makePost to make axios post request
      const request = await makePost();
      
    } else {
      console.log('Form submission failed');
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
      url: "http://localhost:8000/insert.php",
      data: {
        username: username,
        email: email,
        password: password,
      },
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
      // php echos back message on response, successful response will contain user id
      const data = (response.data).split('\n');
      if (data[1] === 'Username'){
        // alert("Username already taken.")
        error['usermsg'] = "Username is already taken.";
        error['username'] = 'true';
        notify("Username")
        console.log(error['username'])
      }else if (data[1] === 'Email'){
        // alert("Email already is use.")
        error['emailmsg'] = "Email is already in use.";
        error['email'] = 'true';
        console.log(error['email'])
        notify("Email")
      }else{
        // successful submit will navigate to next page
        console.log("success");
        console.log(response)
        console.log(response.data);
        // initialize original error messages
        error['usermsg'] = ""
        error['emailmsg'] = ""
        error['email'] = 'true'
        error['username'] = 'true'
        routeChooseHabits(parseInt(data[1]));
      }
    }).catch(function (error) {
      console.log("failed to send post request");
      console.log(error);
      console.log('error is '+ error.msg);
    });
  }

  // function to handle errors 
  const handleErrors = () => {
    if(username !== ''){
      checkUsername();
    }
    if(email !== ''){
      let valid_email = checkEmail(email);
      // email regex check will return true if email is empty
      if (email === '') {
        valid_email = false
        error['email'] = 'false'
      }
      if (!valid_email){
        error['email'] = 'false'
      }else{
        error['email'] = 'true'
      }
    }
    if(password !== ''){
      checkPasswordLength();
    }
    if(confirmPassword !== ''){
      checkPassword();
    }
  }

  handleErrors();

  useEffect(() => {
    document.title = "Sign Up";  
}, []);

  // return the JSX for the Signin component
  return (
    <div className='signin_container'>

        <div className="message_div">
          <div className='message_wrapper'>
            <h2 id="signin_message">Start your journey to building strong habits</h2>
            <p id="account_question">Already Have An Account?
              <button id="login_button" onClick={routeLogin}>Log In</button>
            </p>
            <button id="back_buton" onClick={routeLanding}>&lt; Back</button>
          </div>
        </div>

        <div className="signin_div">
          <div className='signin_wrapper'>
          <ToastContainer />
            <h2 id="signin_header">Create Your Account</h2>
            <form id="signin_form" action="#" method="post" onSubmit={handleSubmit}>
              <label id="username_label">Username</label>
              <input id="username_input" type="text" placeholder="At least 3 characters" onChange={changeUsername} required/>
              <small id="username_error">{error['username'] !== 'true' ? "Username must be at least 3 characters." : ""}</small>
              <small id="email_error">{error['usermsg']}</small>
              <label id="email_label">Email</label>
              <input id="email_input" type="email" placeholder="Enter your email" onChange={changeEmail} required/>
              <small id="email_error">{error['email'] !== 'true' ? "Must provide a valid email." : ""}</small>
              <small id="email_error">{error['emailmsg']}</small>
              <label id="password_label">Password</label>
              <input id="password_input" type="password" placeholder="Must be at least 8 characters" onChange={changePassword} required/>
              <small id="password_error">{error['password'] !== 'true' ? "Password must be at least 8 characters." : ""}</small>
              <label id="confirm_password_label">Confirm Password</label>
              <input id="confirm_password_input" type="password" placeholder="Confirm your password" onChange={changeConfirmPassword} required/>
              <small id="confirm_password_error">{error['confirmPassword'] !== 'true' ? "Passwords do not match." : ""}</small>
              <button id="create_account_button" type='submit'>Continue</button>
            </form>
          </div>
        </div>

    </div>
  );
}

export default Signin;