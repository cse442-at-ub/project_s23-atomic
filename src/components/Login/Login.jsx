import React, { useState, useNavigate } from "react";

import "./login.css"

import LoginCharacter from "../../assets/images/login-character.png"

function Login() {

    const [login, setLogin] = useState({
        username: "",
        password: "",
    })

    const setUsername = (event) => {
        setLogin({ ...login, username: event.target.value });
    };
    const setPassword = (event) => {
        setLogin({ ...login, password: event.target.value });
    };

    // function to handle the form submission
    const handleSubmit = async(event) => {
    event.preventDefault();
    
    // const request = await makePost();
    };

    // const navigate = useNavigate(); // Allows usage of navigate() to go to a specified page

    // Path to go to Choose Habits page after logging in
    // const routeChooseHabits = (id) =>{ 
    //     let path = `/choose-habit`; 
    //     navigate(path, {state: {user: id}});
    // }

    // need to have actual url to access server
    // const makePost = async() => {
    //     await axios({
    //     method: "post",
    //     url: "http://localhost:8000/insert.php",
    //     // url: "https://www-student.cse.buffalo.edu/~argraca/insert.php",
    //     data: {
    //         username: login.username,
    //         password: login.password,
    //     },
    //     headers: { "Content-Type": "multipart/form-data" },
    //     }).then(function (response) {
    //     // php echos back message on response, successful response will contain user id
    //     const data = (response.data).split('\n');

    //     // Need if-else conditionals incase user doesn't exist

    //     // }else{
    //         // successful submit will navigate to next page
    //         console.log("success");
    //         console.log(response)
    //         console.log(response.data);
    //         routeChooseHabits(parseInt(data[1]));
    //     // }
    //     }).catch(function (error) {
    //     console.log("failed to send post request");
    //     console.log(error);
    //     console.log('error is '+ error.msg);
    //     });
    // }


    return(
        <>
        <div id="login-back-link">
            <a href="">&lt; Back</a>
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
                                <input type="text" name="username" size="30" />
                            </label>
                        </div>
                        <div className="login-form-field">
                            <label>
                                <h6>Password</h6>
                                <input type="password" name="password" size="30" />
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
