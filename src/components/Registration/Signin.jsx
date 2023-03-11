import React from 'react';
import './sign-in.css';
import { useState } from 'react';

function Signin() {

  // state variables for the form inputs: username, email, password, and confirm password
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // state variable to track where errors occur in the form
  let error = {
    username: 'true',
    email: 'true',
    password: 'true',
    confirmPassword: 'true'
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


  // function to handle the form submission
  const handleSubmit = (event) => {
    let valid_username = checkUsername();
    let valid_email = checkEmail();
    // email regex check will return true if email is empty
    if (email === '') {
      valid_email = false
      error['email'] = 'false'
    }
    let valid_length = checkPasswordLength();
    let valid_password = checkPassword();

    if (valid_username && valid_email && valid_length && valid_password) {
      console.log('Form submitted successfully');
    } else {
      event.preventDefault();
      console.log('Form submission failed');
      console.log(error)
      console.log(error['username'] === 'false')
    }
    
  };

  // function to handle errors 
  const handleErrors = () => {
    if(username !== ''){
      let valid_username = checkUsername();
    }
    if(email !== ''){

      let valid_email = checkEmail();
      // email regex check will return true if email is empty
      if (email === '') {
        valid_email = false
        error['email'] = 'false'
      }
    }
    if(password !== ''){
      let valid_length = checkPasswordLength();
    }
    if(confirmPassword !== ''){
      let valid_password = checkPassword();
    }
  }

  handleErrors();

  // return the JSX for the Signin component
  return (
    <div className='signin_container'>

        <div className="message_div">
          <h2 id="signin_message">Start your journey to building strong habits</h2>
          <p id="account_question">Already Have An Account?
            <button id="login_button">Log In</button>
          </p>
          <button id="back_buton">↵</button>
        </div>

        <div className="signin_div">
          <h2 id="signin_header">Create Your Account</h2>
          <form id="signin_form" onSubmit={handleSubmit}>
            <label id="username_label">Username</label>
            <input id="username_input" type="text" placeholder="At least 3 characters" onChange={changeUsername}/>
            <small id="username_error">{error['username'] !== 'true' ? "Username must be at least 3 characters." : ""}</small>
            <label id="email_label">Email</label>
            <input id="email_input" type="email" placeholder="Enter your email" onChange={changeEmail}/>
            <small id="email_error">{error['email'] !== 'true' ? "Must provide a valid email." : ""}</small>
            <label id="password_label">Password</label>
            <input id="password_input" type="password" placeholder="Must be at least 8 characters" onChange={changePassword}/>
            <small id="password_error">{error['password'] !== 'true' ? "Password must be at least 8 characters." : ""}</small>
            <label id="confirm_password_label">Confirm Password</label>
            <input id="confirm_password_input" type="password" placeholder="Confirm your password" onChange={changeConfirmPassword}/>
            <small id="confirm_password_error">{error['confirmPassword'] !== 'true' ? "Passwords do not match." : ""}</small>
            <button id="create_account_button" type='submit'>Continue</button>
          </form>
        </div>

    </div>
  );
}

export default Signin;